<script lang="ts">
    import type { PracticeOptions, SetInfo } from "$lib/client";

    import { createEventDispatcher } from "svelte";
    import TimedPracticeToolbar from "./TimedPracticeToolbar.svelte";

    export let setInfo: SetInfo
    export let options: PracticeOptions

    const dispatch = createEventDispatcher()
    
    let time = options.practiceTime
    const timerInterval = setInterval(() => {
        if (time === 0) {
            clearInterval(timerInterval)
            dispatch("timeEnd", { practiceLength: options.practiceTime })
        } else {
            time--
        }
    }, 1000)

    function handleExit(e: CustomEvent) {
        const { time } = e.detail
        dispatch('exitPractice', { practiceLength: options.practiceTime - time })
    }
</script>

<div class="timed-practice">
    <slot></slot>
    <TimedPracticeToolbar {time} {setInfo} on:exitPractice={handleExit} />
</div>

<style lang="scss">
    .timed-practice {
        background: var(--background-3);
        border-radius: 15px;
        padding: 2.5em;
        color: var(--text-light);
        width: min(700px, 80vw);
    }
</style>