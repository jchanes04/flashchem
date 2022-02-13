<script lang="ts">
    import practiceOptions from "$lib/stores/practiceOptions";

    import { createEventDispatcher } from "svelte";
    import TimedPracticeToolbar from "./TimedPracticeToolbar.svelte";

    const dispatch = createEventDispatcher()
    
    let time = $practiceOptions.practiceTime
    const timerInterval = setInterval(() => {
        if (time === 0) {
            clearInterval(timerInterval)
            dispatch("timeEnd", { practiceLength: $practiceOptions.practiceTime })
        } else {
            time--
        }
    }, 1000)

    function handleExit(e: CustomEvent) {
        const { time } = e.detail
        dispatch('exitPractice', { practiceLength: $practiceOptions.practiceTime - time })
    }
</script>

<div class="timed-practice">
    <slot></slot>
    <TimedPracticeToolbar {time} setInfo={$practiceOptions.selectedSet} on:exitPractice={handleExit} />
</div>

<style lang="scss">
    
</style>