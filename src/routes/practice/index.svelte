<script context="module" lang="ts">
    import { browser } from "$app/env";
    import type { LoadOutput } from "@sveltejs/kit/types/internal";

    export async function load(): Promise<LoadOutput> {
        if (browser) {
            return {
                props: {
                    confirmed: localStorage.getItem('dontShowLoginPrompt') === 'true'
                }
            }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import { session } from "$app/stores";
    import NotLoggedIn from "$lib/components/NotLoggedIn.svelte";
    import PracticeOptionMenu from "$lib/components/PracticeOptionMenu.svelte";
    import { onMount } from "svelte";
    import type { LastQuestionData, PracticeOptions, PracticeState } from "$lib/client";
    import type { PracticeLength, SetItem } from "$lib/global";
    import PracticeResults from "$lib/components/PracticeResults.svelte";
    import type { PracticeSet } from "$lib/global";
    import getNextQuestion from "$lib/functions/client/getNextQuestion";
    import numberToTime from "$lib/functions/client/numberToTime";
    import sendScores from "$lib/functions/client/sendScores";
    import { calculateFixedQuestionScore, calculateStreakScore, calculateTimedScore } from "$lib/functions/client/calculateScore";
    import practiceOptions from "$lib/stores/practiceOptions";
    import practiceStats from "$lib/stores/practiceStats";
    import { FixedQuestionPractice, InfinitePractice, ListPractice, PlacePractice, StreakPractice, TimedPractice } from '$lib/components/PracticeHandlers/practiceHandlers'

    export let practiceState: PracticeState = $session.loggedIn ? "options" : "loading"

    let setData: PracticeSet = null
    let error: string = null

    let exclude: number[] = []
    let currentQuestion: SetItem = null

    let lastQuestionData: LastQuestionData = null

    let scoreSubmitError = null

    let timerInterval = null

    $: PracticeComponent = $practiceOptions?.selectedSet.type === "list" ? ListPractice
        : $practiceOptions?.selectedSet.type === "place"
            ? PlacePractice
            : ListPractice


    onMount(() => {
        if (!$session.loggedIn) {
            if (localStorage.getItem('dontShowLoginPrompt') === 'true') {
                practiceState = "options"
            } else {
                practiceState = "login-prompt"
            }
        }
    })

    async function onStart(e: CustomEvent<PracticeOptions>) {
        $practiceOptions = e.detail
        history.pushState({}, '', '/practice/?set=' + $practiceOptions.selectedSet.id)
        
        const setDataRes = await fetch('/api/set/' + $practiceOptions.selectedSet.id)
        const setDataValue = await setDataRes.json()
        
        if (setDataValue) {
            setData = setDataValue
            $practiceStats = {
                numberCorrect: 0,
                questionNumber: 1
            }

            const { nextQuestion, newExclude } = getNextQuestion(setData.items, [])
            currentQuestion = nextQuestion
            exclude = newExclude

            practiceState = "practicing"
        }
    }

    async function handleCorrect() {
        $practiceStats.numberCorrect++
        $practiceStats.questionNumber++
        
        const { nextQuestion, newExclude } = getNextQuestion(setData.items, exclude)
        exclude = newExclude
        currentQuestion = nextQuestion
    }

    async function handleSkip() {
        $practiceStats.questionNumber++
        
        const { nextQuestion, newExclude } = getNextQuestion(setData.items, exclude)
        exclude = newExclude
        currentQuestion = nextQuestion
    }

    async function handleEnd(e?: CustomEvent<{ practiceLength: number, lastQuestion?: LastQuestionData }>) {
        practiceState = "results"
        clearInterval(timerInterval)

        const { practiceLength, lastQuestion } = e.detail

        if ($practiceOptions.practiceMode === "timed") {
            $practiceStats.statistics = [{
                figure: ($practiceStats.numberCorrect / practiceLength).toFixed(2),
                units: "questions / second"
            }]
            $practiceStats.score = calculateTimedScore(practiceLength, $practiceStats.numberCorrect)
            
            if ($practiceOptions.postScore)
                scoreSubmitError = await sendScores($practiceStats.score, $session.userData.userId, $practiceOptions, <PracticeLength<"timed">>practiceLength)
        } else if ($practiceOptions.practiceMode === "fixed-questions") {
            $practiceStats.statistics = [{
                figure: ($practiceStats.numberCorrect / practiceLength).toFixed(2),
                units: "questions / second"
            }]
            $practiceStats.score = calculateFixedQuestionScore(practiceLength, $practiceStats.numberCorrect)
            
            if ($practiceOptions.postScore)
                scoreSubmitError = await sendScores($practiceStats.score, $session.userData.userId, $practiceOptions, <PracticeLength<"fixed-questions">>practiceLength)
        } else if ($practiceOptions.practiceMode === "infinite") {
            $practiceStats.statistics = [
                {
                    figure: (100 * $practiceStats.numberCorrect / ($practiceStats.questionNumber - 1)).toFixed(1),
                    units: "% correct"
                },
                {
                    figure: ($practiceStats.numberCorrect / practiceLength).toFixed(2),
                    units: "questions / second"
                },
                {
                    figure: practiceLength > 150 ? numberToTime(practiceLength) : practiceLength ,
                    units: practiceLength > 150 ? "minutes long" : "seconds long" 
                }
            ]
        } else if ($practiceOptions.practiceMode === "streak") {
            $practiceStats.statistics = [{
                figure: (100 * $practiceStats.numberCorrect / $practiceStats.questionNumber).toFixed(1),
                units: "% correct"
            }]
            $practiceStats.score = calculateStreakScore(practiceLength, $practiceStats.numberCorrect)
            $practiceStats.lastQuestion = lastQuestion
            
            if ($practiceOptions.postScore)
                scoreSubmitError = await sendScores($practiceStats.score, $session.userData.userId, $practiceOptions, "streak")
        }
    }

    async function handlePlayAgain() {
        const { nextQuestion, newExclude } = getNextQuestion(setData.items, [])
        currentQuestion = nextQuestion
        exclude = newExclude
        
        $practiceStats = {
            numberCorrect: 0,
            questionNumber: 1
        }
        exclude = []
        practiceState = "practicing"
    }

    async function handleBackToOptions() {
        currentQuestion = null
        error = null
        $practiceOptions = null
        exclude = []
    }
</script>

<main class:practicing={practiceState === "practicing"}>
    {#if practiceState === "loading"}
        <div></div>
    {:else if practiceState === "login-prompt"}
        <NotLoggedIn on:continue={() => {practiceState = "options"}} />
    {:else if currentQuestion === null}
        <PracticeOptionMenu on:start={onStart} />
    {:else if practiceState === "error"}
        <p>Set not found</p>
    {:else if practiceState === "practicing"}
        {#if $practiceOptions.practiceMode === "timed"}
            <TimedPractice on:timeEnd={handleEnd} on:exitPractice={handleEnd}>
                <svelte:component this={PracticeComponent} {currentQuestion}
                    on:correct={handleCorrect} />
            </TimedPractice>
        {:else if $practiceOptions.practiceMode === "fixed-questions"}
            <FixedQuestionPractice on:practiceEnd={handleEnd}>
                <svelte:component this={PracticeComponent} {currentQuestion} showSkip
                    on:correct={handleCorrect} on:skip={handleSkip} />
            </FixedQuestionPractice>
        {:else if $practiceOptions.practiceMode === "infinite"}
            <InfinitePractice on:practiceEnd={handleEnd}>
                <svelte:component this={PracticeComponent} {currentQuestion} showSkip
                    on:correct={handleCorrect} on:skip={handleSkip} />
            </InfinitePractice>
        {:else if $practiceOptions.practiceMode === "streak"}
            <StreakPractice on:practiceStart={(e) => {timerInterval = e.detail.timerInterval}} on:practiceEnd={handleEnd}>
                <svelte:component this={PracticeComponent} {currentQuestion} showNext
                    on:correct={handleCorrect} on:skip={handleSkip} on:incorrect={handleEnd} />
            </StreakPractice>
        {/if}
    {:else if practiceState === "results"}
        <PracticeResults on:playAgain={handlePlayAgain} on:backToOptions={handleBackToOptions} lastQuestion={$practiceStats.lastQuestion} />
    {/if}
</main>

<style lang="scss">
    main {
        width: 100%;
        height: 100%;
        display: grid;
        place-content: center;
        position: relative;
    }

    .practicing {
        margin-bottom: 80px;
    }
</style>