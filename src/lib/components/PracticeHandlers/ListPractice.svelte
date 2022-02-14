<script lang="ts">
    import type { LastQuestionData } from "$lib/client";
    import getTextSizeClass from "$lib/functions/client/getTextSizeClass";

    import type { SetItem } from "$lib/global";
    import practiceOptions from "$lib/stores/practiceOptions";
    import { createEventDispatcher, onMount } from "svelte";

    export let currentQuestion: SetItem
    export let showSkip: boolean
    export let showNext: boolean

    let skipDisabled = false

    const dispatch = createEventDispatcher()

    let inputElement: HTMLInputElement
    let inputtedValue: string
    let lastValue = ""

    const numberRegex = /^[0-9]*\.?[0-9]*$/

    onMount(() => {
        inputElement.focus()
        console.dir($practiceOptions.selectedSet)
    })

    function handleInput() {
        if (!showNext && inputtedValue === currentQuestion.value) {
            dispatch('correct')
            inputtedValue = ""
        } else if ($practiceOptions.selectedSet.etc?.inputType === "number") {
            if (numberRegex.test(inputtedValue)) {
                lastValue = inputtedValue
            } else {
                inputtedValue = lastValue
            }
        }
    }

    function handleNext() {
        if (inputtedValue === currentQuestion.value) {
            dispatch('correct')
            inputtedValue = ""
        } else {
            dispatch('incorrect', {
                lastQuestion: {
                    key: currentQuestion.key,
                    givenAnswer: inputtedValue,
                    correctAnswer: currentQuestion.value
                } as LastQuestionData
            })
            inputtedValue = ""
        }
    }

    function handleSkip() {
        skipDisabled = true
        setTimeout(() => {
            skipDisabled = false
        }, 1000)
        dispatch('skip')
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" || e.keyCode === 13) {
            handleNext()
        }
    }
</script>

<div class="list-practice">
    <p class={getTextSizeClass(currentQuestion.key.toString())}>{currentQuestion.key}</p>
    <div class="input-container">
        <input type="text" bind:this={inputElement} bind:value={inputtedValue} on:input={handleInput} on:keydown={handleKeydown} />
        {#if showNext}
            <button class="next primary" on:click={handleNext}>Next</button>
        {/if}
    </div>
    {#if showSkip}
        <p class="skip" class:disabled={skipDisabled} on:click={handleSkip}>Skip question</p>
    {/if}
</div>

<style lang="scss">
    .list-practice {
        background: var(--background-3);
        border-radius: 15px;
        padding: 2.5em;
        color: var(--text-light);
        width: min(700px, 80vw);
    }

    p {
        text-align: center;
        margin-top: 0;
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

    input {
        background: var(--background-1);
        border-radius: 7px;
        color: var(--text-light);
        border: none;
        outline: none;
        padding: 0.3em 0.5em;
        font-size: 24px;
        display: inline-block;
        width: 36ch;
        max-width: 90%;
        text-align: center;
    }

    .skip {
        margin-top: 1em;
        margin-bottom: 0.5em;
        text-decoration: underline;
        cursor: pointer;
        user-select: none;
    }

    .disabled {
        visibility: hidden;
    }

    .next {
        width: 8ch;
    }

    button {
        border-radius: 10px;
        font-size: 24px;
        font-weight: 600;
        border: none;
        margin: 0 0.5em;
        padding: 0.3em 0.5em;
        color: var(--text-dark);
        cursor: pointer;
    }

    .primary {
        background-color: var(--button-1);

        &:hover {
            background-color: var(--button-1-hover);
        }
    }

    @media (max-width: 650px) {
        .list-practice {
            padding: 1.5em 1em;
        }

        input {
            font-size: 20px;
        }

        .large {
            font-size: 48px;
            margin-bottom: 0.5em;
        }
    } 

    @media (max-height: 620px) {
        .list-practice {
            padding: 1em;
        }

        p {
            margin-bottom: 0.2em;
        }

        .large {
            font-size: 48px;
        }

        input {
            font-size: 20px;
        }
    }
</style>