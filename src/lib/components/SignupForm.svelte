<script lang="ts">
import { afterUpdate, onMount } from 'svelte';

    import { form as customForm, bindClass } from 'svelte-forms'

    let username = ""
    let purpose = "N/A"

    const usernameNotTaken = async value => fetch(`/api/usernameTaken?username=${encodeURIComponent(value)}`, {
        credentials: 'include'
    })
    .then(d => d.json())
    .then(d => ({
        name: "usernameIsNotTaken",
        valid: !d.taken
    }))

    let myForm
    onMount(() => {
        myForm = customForm(
            () => ({
                username: {
                    value: username,
                    validators: ["required", "min:6", "max:30", usernameNotTaken]
                },
                purpose: {
                    value: purpose,
                }
            }),
            {
                validateOnChange: false,
                initCheck: true
            }
        )
        console.log(purpose)
    })

    afterUpdate(() => {
        myForm.validate()
    })
</script>

<form method="POST" action="/signup">
    <div class="field text">
        <label for="username-input">Username</label>
        <input id="username-input" type="text" name="username" bind:value={username} />
    </div>
    <div class="field radio" id="radio">
        <h4>Why have you decided to use FlashChem?</h4>
        <input type="radio" name="purpose" bind:group={purpose} style="display: none;" checked />
        <label for="high-school-class-input" on:click={() => {console.log('click')}}>
            <input id="high-school-class-input" type="radio" name="purpose" bind:group={purpose} />
            <span />
            To study for a High School level class
        </label>
        <label for="college-level-class-input">
            <input id="college-level-class-input" type="radio" name="purpose" bind:group={purpose} />
            <span />
            To study for a College level class
        </label>
        <label for="competition-input">
            <input id="competition-input" type="radio" name="purpose" bind:group={purpose} />
            <span />
            To study for a competition like USNCO
        </label>
        <label for="personal-input">
            <input id="personal-input" type="radio" name="purpose" bind:group={purpose} />
            <span />
            To study for myself or for another purpose
        </label>
    </div>
    <div class="button">
        <button on:click|preventDefault={() => myForm.validate()}>
            Create Account
        </button>
    </div>
</form>

<style lang="scss">
    .text {
        label {
            display: block;
            font-size: 18px;
            font-weight: 300;
            margin-left: 1.5em;
            margin-bottom: 0.25em;
        }

        input {
            background: var(--background-1);
            border-radius: 7px;
            color: var(--text-light);
            border: none;
            outline: none;
            padding: 0.3em 0.5em;
            font-size: 24px;
            margin-left: 0.3em;
        }
    }

    #radio {
        h4 {
            font-size: 18px;
            font-weight: 300;
            margin-left: 1.5em;
            margin-bottom: 0.25em;
        }

        label {
            cursor: pointer;
            padding-top: 0.5em;
            padding-bottom: 0.5em;
            display: block;
            font-size: 24px;
            line-height: 1;

            input {
                visibility: hidden;
                width: 0;
                height: 0;

                &:checked ~ span::after {
                    display: inline-block;
                }
            }

            span {
                width: 1em;
                height: 1em;
                border-radius: 50%;
                display: inline-block;
                position: relative;
                background: var(--background-1);
                vertical-align: 0px;
                margin-right: 0.3em;

                &::after {
                    content: '';
                    position: absolute;
                    display: none;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 0.6em;
                    height: 0.6em;
                    border-radius: 50%;
                    background: var(--emph);
                }
            }
        }
    }

    .button {
        width: 100%;
        text-align: right;
    }

    button {
        font-size: 24px;
        font-weight: 600;
        color: var(--text-dark);
        background: var(--button-1);
        border-radius: 10px;
        border: none;
        outline: none;
        padding: 0.5em;
        display: inline-block;
        margin-top: 1.5em;
    }
</style>