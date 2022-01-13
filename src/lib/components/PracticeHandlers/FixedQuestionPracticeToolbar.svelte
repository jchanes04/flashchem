<script lang="ts">
    import type { SetInfo } from "$lib/client";
    import uppercaseWords from "$lib/functions/client/uppercaseWords";

    export let questionNumber: number
    export let totalQuestions: number
    export let setInfo: SetInfo
</script>

<div class="practice-toolbar">
    <div class="left">{setInfo.name}</div>
    <div class="question-number">{questionNumber} / {totalQuestions}</div>
    <div class="right" style="">
        <div>{uppercaseWords(setInfo.difficulty)}</div>
        <span>|</span>
        <div>{uppercaseWords(setInfo.type)}</div>
        <span>|</span>
        <div>{uppercaseWords(setInfo.topic)}</div>
        <div class="icon exit-icon"></div>
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

        span {
            transform: scaleY(1.5);
        }
    }

    .icon {
        width: 1.5em;
        height: 1.5em;
        background-color: var(--text-light);
        vertical-align: middle;
    }
</style>