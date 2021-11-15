<script context="module" lang="ts">
    import { browser } from "$app/env";
    import type { LoadOutput } from "@sveltejs/kit";

    export async function load(): Promise<LoadOutput> {
        if (browser) {
            return {
                props: {
                    confirmed: localStorage.getItem('dontShowLoginPrompt') === 'true'
                }
            }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import { session } from "$app/stores";
    import NotLoggedIn from "$lib/components/NotLoggedIn.svelte";
    import { onMount } from "svelte";

    export let confirmed = undefined

    onMount(() => {
        confirmed = localStorage.getItem('dontShowLoginPrompt') === 'true'
    })
</script>

<main class:not-confirmed={!confirmed}>
    {#if confirmed === undefined}
        <div></div>
    {:else if !confirmed && !$session.loggedIn}
        <NotLoggedIn on:continue={() => confirmed = true} />
    {:else}
        <div></div>
    {/if}
</main>

<style lang="scss">
    .not-confirmed {
        display: grid;
        place-content: center;
        min-height: 80vh;
    }
</style>