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
    import type { ModeScore, NextQuestionResponse, PracticeOptions, SetInfo } from "$lib/client";
    import type { SetItem } from "$lib/global";
    import TimedPractice from "$lib/components/PracticeHandlers/TimedPractice.svelte";
    import PracticeResults from "$lib/components/PracticeResults.svelte";
    import FixedQuestionPractice from "$lib/components/PracticeHandlers/FixedQuestionPractice.svelte";
    import InfinitePractice from "$lib/components/PracticeHandlers/InfinitePractice.svelte";
    import StreakPractice from "$lib/components/PracticeHandlers/StreakPractice.svelte";

    export let confirmed = undefined
    let practicing = false

    let questionQueue: SetItem[] = null
    let error: string = null

    let setInfo: SetInfo = null
    let options: PracticeOptions = null

    let exclude: number[] = []
    let numberCorrect = 0
    let modeScore: ModeScore = null
    let questionNumber = 1

    let timerInterval = null

    $: PracticeComponent = setInfo?.type === "list" ? ListPractice
        : ListPractice


    onMount(() => {
        confirmed = localStorage.getItem('dontShowLoginPrompt') === 'true'
    })

    async function onStart(e: CustomEvent<PracticeOptions>) {
        options = e.detail
        setInfo = options.selectedSet
        const firstQuestionRes = await fetch('https://' + $page.host + `/api/question/${options.selectedSet.id}`)
        if (firstQuestionRes.status === 404) {
            error = "setNotFound"
            return
        }
        const firstQuestion: NextQuestionResponse = await firstQuestionRes.json()
        const secondQuestionRes = await fetch('https://' + $page.host + `/api/question/${options.selectedSet.id}`)
        if (firstQuestionRes.status === 404) {
            error = "setNotFound"
            return
        }
        const secondQuestion: NextQuestionResponse = await secondQuestionRes.json()
        questionQueue = [firstQuestion.selectedQuestion, secondQuestion.selectedQuestion]
        
        numberCorrect = 0
        questionNumber = 1
        practicing = true
    }

    async function handleCorrect() {
        numberCorrect++
        questionNumber++
        
        questionQueue.shift()
        questionQueue = [...questionQueue]

        const newQuestionRes = await fetch('https://' + $page.host + `/api/question/${options.selectedSet.id}?exclude=${encodeURIComponent(exclude.join(","))}`)
        const newQuestion: NextQuestionResponse = await newQuestionRes.json()
        if (newQuestion.resetExclude) exclude = []
        exclude.push(newQuestion.selectedQuestion.i)
        if (newQuestionRes.status === 200) questionQueue = [...questionQueue, newQuestion.selectedQuestion]
    }

    async function handleSkip() {
        questionNumber++
        
        questionQueue.shift()
        questionQueue = [...questionQueue]

        const newQuestionRes = await fetch('https://' + $page.host + `/api/question/${options.selectedSet.id}?exclude=${encodeURIComponent(exclude.join(","))}`)
        const newQuestion: NextQuestionResponse = await newQuestionRes.json()
        if (newQuestion.resetExclude) exclude = []
        exclude.push(newQuestion.selectedQuestion.i)
        if (newQuestionRes.status === 200) questionQueue = [...questionQueue, newQuestion.selectedQuestion]
    }

    function handleEnd(e?: CustomEvent<{ practiceLength?: number }>) {
        practicing = false
        clearInterval(timerInterval)

        if (options.practiceMode === "timed") {
            modeScore = {
                number: numberCorrect / options.practiceTime,
                units: "questions / second"
            }
        } else if (options.practiceMode === "fixed-questions") {
            modeScore = {
                number: numberCorrect / e.detail.practiceLength,
                units: "questions / second"
            }
        } else if (options.practiceMode === "infinite") {
            modeScore = {
                number: 100 * numberCorrect / (questionNumber - 1),
                units: "% correct"
            }
        }
    }

    async function handlePlayAgain() {
        const firstQuestionRes = await fetch('https://' + $page.host + `/api/question/${options.selectedSet.id}`)
        if (firstQuestionRes.status === 404) {
            error = "setNotFound"
            return
        }
        const firstQuestion: NextQuestionResponse = await firstQuestionRes.json()
        const secondQuestionRes = await fetch('https://' + $page.host + `/api/question/${options.selectedSet.id}`)
        if (firstQuestionRes.status === 404) {
            error = "setNotFound"
            return
        }
        const secondQuestion: NextQuestionResponse = await secondQuestionRes.json()
        questionQueue = [firstQuestion.selectedQuestion, secondQuestion.selectedQuestion]
        
        numberCorrect = 0
        questionNumber = 1
        modeScore = null
        exclude = []
        practicing = true
    }

    async function handleBackToOptions() {
        questionQueue = null
        error = null
        setInfo = null
        options = null
        exclude = []
        modeScore = null
    }
</script>

<main>
    {#if confirmed === undefined}
        <div></div>
    {:else if !confirmed && !$session.loggedIn}
        <NotLoggedIn on:continue={() => {confirmed = true}} />
    {:else if questionQueue === null}
        <PracticeOptionMenu on:start={onStart} />
    {:else if error}
        <p>Set not found</p>
    {:else if practicing}
        {#if options.practiceMode === "timed"}
            <TimedPractice {setInfo} {options} on:timeEnd={handleEnd}>
                <svelte:component this={PracticeComponent} {questionQueue}
                    on:correct={handleCorrect} />
            </TimedPractice>
        {:else if options.practiceMode === "fixed-questions"}
            <FixedQuestionPractice {setInfo} {options} {questionNumber} on:practiceEnd={handleEnd}>
                <svelte:component this={PracticeComponent} {questionQueue} showSkip
                    on:correct={handleCorrect} on:skip={handleSkip} />
            </FixedQuestionPractice>
        {:else if options.practiceMode === "infinite"}
            <InfinitePractice {setInfo} on:practiceEnd={handleEnd}>
                <svelte:component this={PracticeComponent} {questionQueue} showSkip
                    on:correct={handleCorrect} on:skip={handleSkip} />
            </InfinitePractice>
        {:else if options.practiceMode === "streak"}
            <StreakPractice {setInfo} on:practiceStart={(e) => {timerInterval = e.detail.timerInterval}}>
                <svelte:component this={PracticeComponent} {questionQueue} showNext
                    on:correct={handleCorrect} on:skip={handleSkip} on:incorrect={handleEnd} />
            </StreakPractice>
        {/if}
    {:else}
        <PracticeResults score={numberCorrect} {modeScore}
            on:playAgain={handlePlayAgain} on:backToOptions={handleBackToOptions} />
    {/if}
</main>

<style lang="scss">
    main {
        display: grid;
        place-content: center;
        min-height: 80vh;
        width: 100%;
    }
</style>