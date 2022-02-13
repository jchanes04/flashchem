<script lang="ts">
    import practiceOptions from "$lib/stores/practiceOptions";
    import practiceStats from "$lib/stores/practiceStats"

    import { createEventDispatcher } from "svelte";
    import FixedQuestionPracticeToolbar from "./FixedQuestionPracticeToolbar.svelte";

    const dispatch = createEventDispatcher()
    
    let totalQuestions = $practiceOptions.practiceQuestions
    let practiceLength = 1

    const timingInterval = setInterval(() => {
        practiceLength++
    }, 1000)

    $: if ($practiceStats.questionNumber > totalQuestions) {
        clearInterval(timingInterval)
        dispatch('practiceEnd', { practiceLength })
    }
</script>

<div class="fixed-question-practice">
    <slot></slot>
    <FixedQuestionPracticeToolbar setInfo={$practiceOptions.selectedSet} questionNumber={$practiceStats.questionNumber} {totalQuestions}
        on:exitPractice={() => dispatch('practiceEnd', { practiceLength })} />
</div>

<style lang="scss">
    
</style>