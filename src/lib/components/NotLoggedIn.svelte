<script lang="ts">
    import { goto } from "$app/navigation";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()
    let dontAskAgain = false

    function handleContinue() {
        if (dontAskAgain) {
            localStorage.setItem('dontShowLoginPrompt', 'true')
        }

        dispatch('continue')
    }
</script>

<div id="not-logged-in">
    <h1>Log in to save your scores</h1>
    <button class="primary" on:click={() => goto('/auth/google')}>Sign in to FlashChem</button>
    <button class="secondary" on:click={handleContinue}>Continue Anonymously</button>
    <br />
    <label for="dont-ask-again">
        <input type="checkbox" id="dont-ask-again" bind:checked={dontAskAgain} />
        <span />
        Don't ask me this again
    </label>
</div>

<style lang="scss">
    #not-logged-in {
        background: var(--background-3);
        border-radius: 15px;
        width: min(80vw, 800px);
        text-align: center;
        padding: 1.5em;
    }

    h1 {
        color: var(--text-light);
        font-size: 48px;
        margin:  0 0.5em 0.75em;
    }

    button {
        border-radius: 10px;
        font-size: 24px;
        font-weight: 600;
        border: none;
        margin: 0 0.5em;
        padding: 0.5em 1em;
        color: var(--text-dark);
        cursor: pointer;
    }

    .primary {
        background-color: var(--button-1);

        &:hover {
            background-color: var(--button-1-hover);
        }
    }

    .secondary {
        background-color: var(--button-2);

        &:hover {
            background-color: var(--button-2-hover);
        }
    }

    label {
        cursor: pointer;
        margin-top: 1em;
        display: block;
        font-size: 16px;
        color: var(--text-light);

        input {
            visibility: hidden;
            width: 0;
            height: 0;
        }

        span {
            width: 1em;
            height: 1em;
            border-radius: 25%;
            display: inline-block;
            position: relative;
            background: var(--background-1);
            vertical-align: text-bottom;
            margin-right: 0.3em;
            margin-bottom: 0.1em;

            &::after {
                content: '';
                position: absolute;
                display: none;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0.6em;
                height: 0.6em;
                border-radius: 0.15em;
                background: var(--emph);
            }
        }

        input:checked ~ span::after {
            display: inline-block;
        }
    }
</style>