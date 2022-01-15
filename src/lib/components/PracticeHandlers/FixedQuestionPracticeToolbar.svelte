<script lang="ts">
    import type { SetInfo } from "$lib/client";
    import uppercaseWords from "$lib/functions/client/uppercaseWords";
    import ExitIcon from '$lib/assets/ExitIcon.svelte'
    import { createEventDispatcher } from "svelte";

    export let questionNumber: number
    export let totalQuestions: number
    export let setInfo: SetInfo

    const dispatch = createEventDispatcher()

    function exitPractice() {
        console.log('w')
        dispatch('exitPractice')
    }
</script>

<div class="practice-toolbar">
    <div class="left">{setInfo.name}</div>
    <div class="question-number">{questionNumber} / {totalQuestions}</div>
    <div class="right" style="">
        <span>{uppercaseWords(setInfo.difficulty)}</span>
        <span class="vertical-line">|</span>
        <span>{uppercaseWords(setInfo.type)}</span>
        <span class="vertical-line">|</span>
        <span>{uppercaseWords(setInfo.topic)}</span>
        <span class="icon" on:click={exitPractice}><ExitIcon /></span>
    </div>
</div>

<style lang="scss">
    .practice-toolbar {
        position: fixed;
        bottom: 0;
        width: calc(100% - 10vw);
        left: 5vw;
        background-color: var(--background-3);
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        color: var(--text-light);
        padding: 1em 2em;
        box-sizing: border-box;

        * {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }

    .left {
        font-size: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .question-number {
        font-size: 48px;
    }

    .right {
        font-size: 20px;
        justify-content: right;
        gap: 1em;

        .vertical-line {
            transform: scaleY(1.5);
        }
    }

    .icon {
        width: 2em;
        height: 2em;
        vertical-align: middle;
        cursor: pointer;

        :global(*) {
            height: 100%;
        }
    }
</style>