<script lang="ts">
    import type { SetItem } from "$lib/global";
    import { createEventDispatcher } from "svelte";

    export let questionQueue: SetItem[]
    export let showSkip: boolean
    export let showNext: boolean


    const dispatch = createEventDispatcher()

    let inputtedValue: string

    function handleInput() {
        if (!showNext && inputtedValue === questionQueue[0].value) {
            dispatch('correct')
            inputtedValue = ""
        }
    }

    function getKeyClass(key: string) {
        if (key.length <= 2) {
            return "large"
        } else if (key.length <= 24) {
            return "medium"
        } else {
            return "small"
        }
    }

    function handleNext() {
        if (inputtedValue === questionQueue[0].value) {
            dispatch('correct')
            inputtedValue = ""
        } else {
            dispatch('incorrect')
            inputtedValue = ""
        }
    }
</script>

<div class="list-practice">
    {#if questionQueue.length}
        <p class={getKeyClass(questionQueue[0].key.toString())}>{questionQueue[0].key}</p>
        <div class="input-container">
            <input type="text" bind:value={inputtedValue} on:input={handleInput} />
            {#if showNext}
                <button class="next primary" on:click={handleNext}>Next</button>
            {/if}
        </div>
        {#if showSkip}
            <p class="skip" on:click={() => dispatch('skip')}>Skip question</p>
        {/if}
    {:else}
        <p class="medium"></p>
        <div class="input-container">
            <input type="text" style="visibility: hidden;" />
            {#if showNext}
                <button class="next primary">Next</button>
            {/if}
        </div>
        {#if showSkip}
            <p class="skip" style="visibility: hidden;">Skip question</p>
        {/if}
    {/if}
</div>

<style lang="scss">
    p {
        text-align: center;
        margin-top: 0;
    }

    .large {
        font-size: 40px;
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
</style>