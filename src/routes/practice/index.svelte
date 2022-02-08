<script context="module" lang="ts">
    import { browser } from "$app/env";
    import type { LoadOutput } from "@sveltejs/kit";

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
    import { page, session } from "$app/stores";
    import ListPractice from "$lib/components/ListPractice.svelte";
    import NotLoggedIn from "$lib/components/NotLoggedIn.svelte";
    import PracticeOptionMenu from "$lib/components/PracticeOptionMenu.svelte";
    import { onMount } from "svelte";
    import type { LastQuestionData, NextQuestionResponse, PracticeOptions, PracticeStatistic, SetInfo } from "$lib/client";
    import type { PracticeLength, SetItem } from "$lib/global";
    import TimedPractice from "$lib/components/PracticeHandlers/TimedPractice.svelte";
    import PracticeResults from "$lib/components/PracticeResults.svelte";
    import FixedQuestionPractice from "$lib/components/PracticeHandlers/FixedQuestionPractice.svelte";
    import InfinitePractice from "$lib/components/PracticeHandlers/InfinitePractice.svelte";
    import StreakPractice from "$lib/components/PracticeHandlers/StreakPractice.svelte";
    import type { PracticeSet } from "$lib/global";
    import getNextQuestion from "$lib/functions/client/getNextQuestion";
    import numberToTime from "$lib/functions/client/numberToTime";
    import sendScores from "$lib/functions/client/sendScores";
    import { calculateFixedQuestionScore, calculateStreakScore, calculateTimedScore } from "$lib/functions/client/calculateScore";
    import PlacePractice from "$lib/components/PlacePractice.svelte";

    export let confirmed = undefined
    let practicing = false

    let setData: PracticeSet = null
    let error: string = null

    let setInfo: SetInfo = null
    let options: PracticeOptions = null

    let exclude: number[] = []
    let currentQuestion: SetItem = null

    let numberCorrect = 0
    let score = 0
    // let modeScore: ModeScore = null
    let practiceStatistics: PracticeStatistic[] = []
    let questionNumber = 1
    let lastQuestionData: LastQuestionData = null

    let scoreSubmitError = null

    let timerInterval = null

    $: PracticeComponent = setInfo?.type === "list" ? ListPractice
        : setInfo?.type === "place"
            ? PlacePractice
            : ListPractice


    onMount(() => {
        confirmed = localStorage.getItem('dontShowLoginPrompt') === 'true'
    })

    async function onStart(e: CustomEvent<PracticeOptions>) {
        console.dir($session)
        options = e.detail
        setInfo = options.selectedSet
        history.pushState({}, '', '/practice/?set=' + options.selectedSet.id)
        
        const setDataRes = await fetch('/api/set/' + options.selectedSet.id)
        const setDataValue = await setDataRes.json()
        
        if (setDataValue) {
            setData = setDataValue
            numberCorrect = 0
            questionNumber = 1

            const { nextQuestion, newExclude } = getNextQuestion(setData.items, [])
            currentQuestion = nextQuestion
            exclude = newExclude

            practicing = true
        }
    }

    async function handleCorrect() {
        numberCorrect++
        questionNumber++
        
        const { nextQuestion, newExclude } = getNextQuestion(setData.items, exclude)
        exclude = newExclude
        currentQuestion = nextQuestion
    }

    async function handleSkip() {
        questionNumber++
        
        const { nextQuestion, newExclude } = getNextQuestion(setData.items, exclude)
        exclude = newExclude
        currentQuestion = nextQuestion
    }

    async function handleEnd(e?: CustomEvent<{ practiceLength: number, lastQuestion?: LastQuestionData }>) {
        practicing = false
        clearInterval(timerInterval)

        const { practiceLength, lastQuestion } = e.detail

        if (options.practiceMode === "timed") {
            practiceStatistics = [{
                figure: (numberCorrect / practiceLength).toFixed(2),
                units: "questions / second"
            }]
            score = calculateTimedScore(practiceLength, numberCorrect)
            
            if (options.postScore)
                scoreSubmitError = await sendScores(score, $session.userData.userId, options, <PracticeLength<"timed">>practiceLength)
        } else if (options.practiceMode === "fixed-questions") {
            practiceStatistics = [{
                figure: (numberCorrect / practiceLength).toFixed(2),
                units: "questions / second"
            }]
            score = calculateFixedQuestionScore(practiceLength, numberCorrect)
            
            if (options.postScore)
                scoreSubmitError = await sendScores(score, $session.userData.userId, options, <PracticeLength<"fixed-questions">>practiceLength)
        } else if (options.practiceMode === "infinite") {
            practiceStatistics = [
                {
                    figure: (100 * numberCorrect / (questionNumber - 1)).toFixed(1),
                    units: "% correct"
                },
                {
                    figure: (numberCorrect / practiceLength).toFixed(2),
                    units: "questions / second"
                },
                {
                    figure: practiceLength > 150 ? numberToTime(practiceLength) : practiceLength ,
                    units: practiceLength > 150 ? "minutes long" : "seconds long" 
                }
            ]
        } else if (options.practiceMode === "streak") {
            practiceStatistics = [{
                figure: (100 * numberCorrect / questionNumber).toFixed(1),
                units: "% correct"
            }]
            score = calculateStreakScore(practiceLength, numberCorrect)
            lastQuestionData = lastQuestion
            
            if (options.postScore)
                scoreSubmitError = await sendScores(score, $session.userData.userId, options, "streak")
        }
    }

    async function handlePlayAgain() {
        const { nextQuestion, newExclude } = getNextQuestion(setData.items, [])
        currentQuestion = nextQuestion
        exclude = newExclude
        
        numberCorrect = 0
        questionNumber = 1
        practiceStatistics = []
        exclude = []
        practicing = true
    }

    async function handleBackToOptions() {
        currentQuestion = null
        error = null
        setInfo = null
        options = null
        exclude = []
        practiceStatistics = []
    }
</script>

<main>
    {#if confirmed === undefined}
        <div></div>
    {:else if !confirmed && !$session.loggedIn}
        <NotLoggedIn on:continue={() => {confirmed = true}} />
    {:else if currentQuestion === null}
        <PracticeOptionMenu on:start={onStart} />
    {:else if error}
        <p>Set not found</p>
    {:else if practicing}
        {#if options.practiceMode === "timed"}
            <TimedPractice {setInfo} {options} on:timeEnd={handleEnd} on:exitPractice={handleEnd}>
                <svelte:component this={PracticeComponent} {currentQuestion}
                    on:correct={handleCorrect} />
            </TimedPractice>
        {:else if options.practiceMode === "fixed-questions"}
            <FixedQuestionPractice {setInfo} {options} {questionNumber} on:practiceEnd={handleEnd}>
                <svelte:component this={PracticeComponent} {currentQuestion} showSkip
                    on:correct={handleCorrect} on:skip={handleSkip} />
            </FixedQuestionPractice>
        {:else if options.practiceMode === "infinite"}
            <InfinitePractice {setInfo} on:practiceEnd={handleEnd}>
                <svelte:component this={PracticeComponent} {currentQuestion} showSkip
                    on:correct={handleCorrect} on:skip={handleSkip} />
            </InfinitePractice>
        {:else if options.practiceMode === "streak"}
            <StreakPractice {setInfo} on:practiceStart={(e) => {timerInterval = e.detail.timerInterval}} on:practiceEnd={handleEnd}>
                <svelte:component this={PracticeComponent} {currentQuestion} showNext
                    on:correct={handleCorrect} on:skip={handleSkip} on:incorrect={handleEnd} />
            </StreakPractice>
        {/if}
    {:else}
        <PracticeResults {numberCorrect} {score} {practiceStatistics} practiceOptions={options}
            on:playAgain={handlePlayAgain} on:backToOptions={handleBackToOptions} lastQuestion={lastQuestionData} />
    {/if}
</main>

<style lang="scss">
    main {
        width: 100%;
        height: 100%;
        display: grid;
        place-content: center;
    }
</style>