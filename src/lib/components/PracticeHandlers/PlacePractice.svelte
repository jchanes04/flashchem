<script lang="ts">
    import type { LastQuestionData } from "$lib/client";
    import getTextSizeClass from "$lib/functions/client/getTextSizeClass";

    import type { SetItem } from "$lib/global";
    import { createEventDispatcher, onMount, tick } from "svelte";
    import PeriodicTableInput from "../PeriodicTableInput.svelte";

    export let currentQuestion: SetItem
    export let showSkip: boolean

    let streak = 0
    let skipDisabled = false
    let lastClickTime = Number.MAX_SAFE_INTEGER
    $: delay = calculateDelay(streak)

    function calculateDelay(s: number) {
        return (Date.now() - lastClickTime < 4 * delay * Math.pow(1.05, s / 250) + 300) ? 500 * Math.pow(0.7, Math.sqrt(s / 1.2)) : 500
    }

    const dispatch = createEventDispatcher()

    async function handleAnswer(e: CustomEvent<{ selectedElement: number }>) {
        const { selectedElement } = e.detail
        if (selectedElement === currentQuestion.value) {
            dispatch('correct')
            streak = (Date.now() - lastClickTime < 2 * delay * Math.pow(1.05, streak / 250) + 300) ? streak + 1 : 0
            await tick()
            lastClickTime = Date.now()
        } else {
            streak = 0
            delay = 500
            await tick()
            lastClickTime = Date.now()
            dispatch('incorrect', {
                lastQuestion: {
                    key: currentQuestion.key,
                    givenAnswer: selectedElement,
                    correctAnswer: currentQuestion.value
                } as LastQuestionData
            })
        }
    }

    function handleSkip() {
        skipDisabled = true
        setTimeout(() => {
            skipDisabled = false
        }, 1000)
        dispatch('skip')
    }
</script>

<div class="place-practice">
    <div class="question">
        <p class={getTextSizeClass(currentQuestion.key.toString())}>{currentQuestion.key}</p>
        {#if showSkip}
            <p class="skip" class:disabled={skipDisabled} on:click={handleSkip}>Skip question</p>
        {/if}
    </div>
    <PeriodicTableInput on:answer={handleAnswer} {delay} />
</div>

<style lang="scss">
    .place-practice {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        margin-top: 3em;
        height: calc(100% - 25px - 3em);
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        place-content: center;
    }

    .question {
        background: var(--background-3);
        border-radius: 15px;
        padding: 1em 5em;
        color: var(--text-light);
        max-height: 60vh;
        width: min-content;
        margin: auto;
    }

    p {
        text-align: center;
        margin: 0;
    }

    .large {
        font-size: 56px;
    }

    .input-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-left: 0.3em;
    }

    .skip {
        margin-top: 1em;
        margin-bottom: 0.5em;
        text-decoration: underline;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
    }

    .disabled {
        visibility: hidden;
    }

    .next {
        width: 8ch;
    }

    .primary {
        background-color: var(--button-1);

        &:hover {
            background-color: var(--button-1-hover);
        }
    }

    @media (max-width: 650px) {
        .place-practice {
            height: calc(100% - 3em);
        }

        .large {
            font-size: 40px;
        }
    }

    @media (max-height: 620px) {
        .place-practice {
            margin: 1em 2em 0;
            grid-template-columns: auto 1fr;
            grid-template-rows: 1fr;
            gap: 1em;
            width: calc(100% - 4em);
        }

        .large {
            font-size: 40px;
        }

        .question {
            padding: 1.5em;
            min-width: 25vw;
            max-width: 40vw;
            box-sizing: border-box;
        }
    }

    @media (max-width: 950px) and (max-height: 620px) {
        .place-practice {
            height: calc(100% - 1.5em);
        }
    }
</style>