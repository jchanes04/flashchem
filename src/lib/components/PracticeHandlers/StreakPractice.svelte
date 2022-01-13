<script lang="ts">
    import type { SetInfo } from "$lib/client";

    import { createEventDispatcher } from "svelte";
    import TimedPracticeToolbar from "./TimedPracticeToolbar.svelte";

    export let setInfo: SetInfo

    const dispatch = createEventDispatcher()
    
    let time = 0
    const timerInterval = setInterval(() => {
        time++
    }, 1000)

    function handleExit() {
        clearInterval(timerInterval)
        dispatch('practiceEnd')
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