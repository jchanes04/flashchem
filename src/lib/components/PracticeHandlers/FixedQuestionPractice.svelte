<script lang="ts">
    import type { PracticeOptions, SetInfo } from "$lib/client";

    import { createEventDispatcher } from "svelte";
    import FixedQuestionPracticeToolbar from "./FixedQuestionPracticeToolbar.svelte";

    export let setInfo: SetInfo
    export let options: PracticeOptions
    export let questionNumber: number

    const dispatch = createEventDispatcher()
    
    let totalQuestions = options.practiceQuestions
    let practiceLength = 1

    const timingInterval = setInterval(() => {
        practiceLength++
    }, 1000)

    $: if (questionNumber > totalQuestions) {
        clearInterval(timingInterval)
        dispatch('practiceEnd', { practiceLength })
    }
</script>

<div class="timed-practice">
    <slot></slot>
    <FixedQuestionPracticeToolbar {setInfo} {questionNumber} {totalQuestions}
        on:exitPractice={() => dispatch('practiceEnd', { practiceLength })} />
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