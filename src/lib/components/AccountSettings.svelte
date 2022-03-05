<script lang="ts">
    import { session } from "$app/stores";
    import { form as createForm, field } from 'svelte-forms'
    import { max, min, required } from 'svelte-forms/validators'
    import { usernameValidator } from "$lib/functions/client/usernameNotTaken";
    import saveSettings from "$lib/functions/client/saveSettings";
    import type { UserSettings } from "$lib/global";
    import splitSettings, { UnsplitSettings } from "$lib/functions/splitSettings";
    import { accountSettingsError } from "$lib/functions/client/getErrorMessage";

    let dirty = false

    let saveError: string = null
    const username = field('username', $session.userData.username, [
        required(),
        min(6),
        max(30),
        usernameValidator(session)
    ])
    const profileVisibility = field('profileVisibility', $session.userData.settings.profileVisibility, [
        required()
    ])
    const submitScoresByDefault = field('submitScoresByDefault', $session.userData.settings.submitScoresByDefault, [
        required()
    ])

    const fields = [
        username, profileVisibility, submitScoresByDefault
    ]
    let form = createForm(...fields)

    async function handleSave() {
        const settingsData = form.summary() as UnsplitSettings
        console.dir(settingsData)
        saveError = await saveSettings(settingsData as UserSettings)
        if (!saveError) {
            const { settings: newSettings, profileData } = splitSettings(settingsData)
            console.dir(newSettings)
            const newUserData = {
                ...$session.userData,
                ...profileData,
                settings: {
                    ...$session.userData.settings,
                    ...newSettings
                }
            }
            $session.userData = newUserData
            dirty = false
        }
    }
</script>

<form class="settings" autocomplete="off" on:input={() => dirty = true}>
    <h2>Settings</h2>
    <h3>Profile</h3>
    <p class="setting-label">Visibility</p>
    <div class="setting-options">
        <label for="visibility-public-input" class="radio-label">
            <input id="visibility-public-input" type="radio" name="profile-visibility" value="public"
                bind:group={$profileVisibility.value} />
            <span />
            Public
        </label>
        <label for="visibility-private-input" class="radio-label">
            <input id="visibility-private-input" type="radio" name="profile-visibility" value="private"
                bind:group={$profileVisibility.value} />
            <span />
            Private
        </label>
    </div>
    <br />
    <label for="username-input" class="setting-label">Username</label>
    <input id="username-input" type="text" bind:value={$username.value} />

    <h3>Practice</h3>
    <label for="submit-scores-input" class="checkbox-label">
        <input id="submit-scores-input" type="checkbox" name="submit-scores-by-default"
            bind:checked={$submitScoresByDefault.value} />
        <span />
        Submit scores by default
    </label>

    {#if saveError}
        <p class="error">{saveError}</p>
    {:else if $form.errors[0]}
        <p class="error">{accountSettingsError($form.errors[0])}</p>
    {/if}
    <button disabled={!dirty || !!$form.errors[0]} on:click|preventDefault={handleSave}>Save Settings</button>
</form>

<style lang="scss">
    .settings {
        width: 100%;
        height: 100%;
        padding: 0em 2em 2em;
        box-sizing: border-box;
        background: var(--background-3);
        border-radius: 15px;
        grid-area: settings;
        color: var(--text-light);
        overflow: auto;
        max-height: max(70vh, 350px);
    }

    h2 {
        font-size: 36px;
        margin-top: 0.5em;
    }

    h3 {
        font-size: 28px;
        font-weight: 500;
        text-decoration: underline;
    }

    .setting-label {
        font-size: 22px;
        font-weight: 500;
        margin: 1em;
    }

    .setting-options {
        margin-left: 1em;
    }

    .radio-label, .checkbox-label {
        cursor: pointer;
        margin-top: 1em;
        display: block;
        font-size: 18px;
        margin-left: 1em;

        input {
            visibility: hidden;
            width: 0;
            height: 0;
        }

        span {
            width: 1em;
            height: 1em;
            border-radius: 50%;
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
                border-radius: 0.3em;
                background: var(--emph);
            }
        }

        input:checked ~ span::after {
            display: inline-block;
        }
    }

    .radio-label span {
        border-radius: 50%;

        &::after {
            border-radius: 0.3em;
        }
    }

    .checkbox-label span {
        border-radius: 25%;

        &::after {
            border-radius: 0.15em;
        }
    }

    input[type="text"] {
        background: var(--background-1);
        border-radius: 0.3em;
        color: var(--text-light);
        border: none;
        outline: none;
        padding: 0.3em 0.5em;
        font-size: 18px;
        display: inline-block;
        width: 36ch;
        max-width: 90%;
        margin-top: 1em;
    }

    .error {
        color: var(--color-2);
    }

    button {
        background: var(--button-1);
        border-radius: 10px;
        font-size: 18px;
        font-weight: 600;
        border: none;
        padding: 0.5em 1em;
        margin-right: 0.5em;
        color: var(--text-dark);
        cursor: pointer;
        margin-top: 2em;

        &:hover {
            background: var(--button-1-hover);
        }

        &:disabled {
            opacity: 0.5;
            cursor: default;

            &:hover {
                background: var(--button-1);
            }
        }
    }
</style>