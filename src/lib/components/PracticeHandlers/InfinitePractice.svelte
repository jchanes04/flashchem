<script lang="ts">
    import practiceOptions from "$lib/stores/practiceOptions";

    import { createEventDispatcher } from "svelte";
    import TimedPracticeToolbar from "./TimedPracticeToolbar.svelte";

    const dispatch = createEventDispatcher()
    
    let time = 0
    const timerInterval = setInterval(() => {
        time++
    }, 1000)

    dispatch('practiceStart', { timerInterval })

    function handleExit() {
        clearInterval(timerInterval)
        dispatch('practiceEnd', { practiceLength: time })
    }
</script>

<div class="infinite-practice">
    <slot></slot>
    <TimedPracticeToolbar {time} setInfo={$practiceOptions.selectedSet} on:exitPractice={handleExit} />
</div>

<style lang="scss">
    .infinite-practice {
        background: var(--background-3);
        border-radius: 15px;
        padding: 2.5em;
        color: var(--text-light);
        width: min(700px, 80vw);
    }
</style>