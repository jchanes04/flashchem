<script lang="ts">
    import practiceOptions from "$lib/stores/practiceOptions";
    import { createEventDispatcher } from "svelte";
    import TimedPracticeToolbar from "./TimedPracticeToolbar.svelte";

    const dispatch = createEventDispatcher()
    
    let time = 0
    const timerInterval = setInterval(() => {
        time++
    }, 1000)

    function handleExit() {
        clearInterval(timerInterval)
        dispatch('practiceEnd', { practiceLength: time })
    }
</script>

<div class="streak-practice">
    <slot></slot>
    <TimedPracticeToolbar {time} setInfo={$practiceOptions.selectedSet} on:exitPractice={handleExit} />
</div>

<style lang="scss">
    
</style>