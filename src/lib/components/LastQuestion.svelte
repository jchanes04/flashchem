<script lang="ts">
    import type { LastQuestionData } from "$lib/client";
    import getTextSizeClass from "$lib/functions/client/getTextSizeClass";  

    export let lastQuestion: LastQuestionData

    $: keyClass = getTextSizeClass(lastQuestion.key.toString())
    $: givenAnswerClass = getTextSizeClass(lastQuestion.givenAnswer.toString())
    $: correctAnswerClass = getTextSizeClass(lastQuestion.correctAnswer.toString())
</script>

<div class="last-question">
    <div class="key">
        <h2>Key: </h2>
        <p class={keyClass}>{lastQuestion.key}</p>
    </div>
    <div class="answers">
        <h2>Your answer:</h2>
        <p class={givenAnswerClass}>{lastQuestion.givenAnswer}</p>
        <h2>Correct Answer:</h2>
        <p class={correctAnswerClass}>{lastQuestion.correctAnswer}</p>
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

    .key {
        .small {
            font-size: 32px;
            margin: 1em;
        }

        .medium {
            font-size: 40px;
            margin: 0.6em;
        }

        .large {
            font-size: 76px;
            margin: 0.3em;
        }
    }

    .answers {
        h2 {
            margin-bottom: 0em;
        }
        
        .small {
            font-size: 22px;
            margin-top: 1em;
        }

        .medium {
            font-size: 32px;
            margin-top: 0.6em;
        }

        .large {
            font-size: 48px;
            margin-top: 0.2em;
        }
    }
</style>