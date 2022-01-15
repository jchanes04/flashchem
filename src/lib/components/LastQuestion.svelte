<script lang="ts">
    import type { LastQuestionData } from "$lib/client";

    export let lastQuestion: LastQuestionData
</script>

<div class="last-question">
    <div class="key">
        <h2>Key: </h2>
        <p>{lastQuestion.key}</p>
    </div>
    <div class="answers">
        <h2>Your answer:</h2>
        <p>{lastQuestion.givenAnswer}</p>
        <h2>Correct Answer:</h2>
        <p>{lastQuestion.correctAnswer}</p>
    </div>
</div>

<style lang="scss">
    .last-question {
        border-top: solid var(--text-light) 1px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        place-content: center;
    }

    .key, .answers {
        height: min-content;
        align-self: center;
    }
</style>