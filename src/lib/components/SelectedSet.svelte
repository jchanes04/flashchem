<script lang="ts">
    import type { SetInfo } from "$lib/client";
    import uppercaseWords from "$lib/functions/client/uppercaseWords";

    export let selectedSet: SetInfo

    const dateTimeFormat = new Intl.DateTimeFormat()
</script>

<div class="set-preview">
    <h3>{selectedSet.name}</h3>

    <div class="flex">
        <span>{uppercaseWords(selectedSet.difficulty)}</span>
        <span class="vertical-line">|</span>
        <span>{uppercaseWords(selectedSet.type)}</span>
        <span class="vertical-line">|</span>
        <span>{uppercaseWords(selectedSet.topic)}</span>
    </div>

    <p class="description">{selectedSet.description}</p>

    {#if selectedSet.createdAt}
        <div style="text-align: right; margin-bottom: 0.5em;">
            <span class="date">Created: {dateTimeFormat.format(selectedSet.createdAt)}</span>
        </div>
    {/if}
</div>

<style lang="scss">
    .set-preview {
        border-radius: 10px;
        border: 2px solid var(--text-light);
        padding: 1em 1em 0.25em;
        margin-top: 1em;
        margin-left: 2em;
        max-width: 500px;
    }

    h3 {
        margin: 0;
    }

    .flex {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        margin-top: 0.25em;
        // margin-left: 1.5em;
    }

    span {
        opacity: 0.8;
    }

    .vertical-line {
        transform: scaleY(1.5);
    }

    p {
        margin-top: 0.5em;
        margin-bottom: 0.75em;
        // margin-left: 1.5em;
    }

    @media (max-width: 650px) {
        .set-preview {
            margin-left: 0;
        }
    }
</style>