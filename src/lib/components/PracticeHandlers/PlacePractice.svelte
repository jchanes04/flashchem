<script lang="ts">
    import type { LastQuestionData } from "$lib/client";
    import getTextSizeClass from "$lib/functions/client/getTextSizeClass";

    import type { SetItem } from "$lib/global";
    import { createEventDispatcher, onMount } from "svelte";
    import PeriodicTableInput from "../PeriodicTableInput.svelte";

    export let currentQuestion: SetItem
    export let showSkip: boolean

    let skipDisabled = false

    const dispatch = createEventDispatcher()

    function handleAnswer(e: CustomEvent<{ selectedElement: number }>) {
        const { selectedElement } = e.detail
        if (selectedElement === currentQuestion.value) {
            dispatch('correct')
        } else {
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
    <PeriodicTableInput on:answer={handleAnswer} />
</div>

<style lang="scss">
    .place-practice {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        margin-top: 3em;
        height: calc(100% - 110px - 3em);
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
</style>