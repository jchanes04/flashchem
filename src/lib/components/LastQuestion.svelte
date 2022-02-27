<script lang="ts">
    import type { LastQuestionData } from "$lib/client";
    import getTextSizeClass from "$lib/functions/client/getTextSizeClass";  

    export let lastQuestion: LastQuestionData

    $: keyClass = getTextSizeClass(lastQuestion.prompt.toString())
    $: givenAnswerClass = getTextSizeClass(lastQuestion.givenAnswer.toString())
    $: correctAnswerClass = getTextSizeClass(lastQuestion.correctAnswer.toString())
</script>

<div class="last-question">
    <div class="key">
        <h2>Prompt: </h2>
        <p class={keyClass}>{lastQuestion.prompt}</p>
    </div>
    <div class="answers">
        <div>
            <h2>Your answer:</h2>
            <p class={givenAnswerClass}>{lastQuestion.givenAnswer}</p>
        </div>
        <div>
            <h2>Correct answer:</h2>
            <p class={correctAnswerClass}>{lastQuestion.correctAnswer}</p>
        </div>
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

    @media (max-width: 650px) {
        .last-question {
            grid-template-columns: auto;
            grid-template-rows: auto auto;
        }

        .answers {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        .key {
            p {
                margin: 0;
            }
            
            .small {
                font-size: 24px;
            }

            .medium {
                font-size: 32px;
            }

            .large {
                font-size: 56px;
            }
        }

        .answers {
            .small {
                font-size: 18px;
                margin-top: 1em;
            }

            .medium {
                font-size: 26px;
                margin-top: 0.6em;
            }

            .large {
                font-size: 40px;
                margin-top: 0.2em;
            }
        }
    }
</style>