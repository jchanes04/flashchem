<script context="module" lang="ts">
    import type { LoadInput, LoadOutput } from "@sveltejs/kit";

    export async function load({ session }: LoadInput): Promise<LoadOutput> {
        if (session.loggedIn) {
            return {}
        } else {
            return {
                status: 302,
                redirect: '/auth/google'
            }
        }
    }
</script>

<script lang="ts">
    import { session } from "$app/stores";
    import AccountInfo from "$lib/components/AccountInfo.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        console.dir($session)
    })
</script>

<main>
    <div class="pfp"></div>
    <AccountInfo userData={$session.userData} />
    <div class="scoreboard"></div>
</main>

<style lang="scss">
    main {
        display: grid;
        width: 1000px;
        max-width: 80vw;
        grid-template-columns: min(300px, 30vw) auto;
        grid-template-rows: auto auto;
        grid-template-areas:
            "pfp info"
            "scoreboard scoreboard";
        gap: 40px;
        margin: auto;
        margin-top: 50px;
    }

    .pfp {
        width: min(250px, 25vw);
        height: min(250px, 25vw);
        background: #C4C4C4;
        border-radius: 50%;
        grid-area: pfp;
        place-self: center;
    }

    .scoreboard {
        width: 100%;
        height: 100%;
        min-height: 300px;
        background: var(--background-3);
        border-radius: 15px;
        grid-area: scoreboard;
    }

    @media (max-width: 900px) {
        main {
            gap: 20px;
            max-width: min(90vw, 720px);
        }
    }

    @media (max-width: 650px) {
        main {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            grid-template-areas: 
                "pfp"
                "info"
                "scoreboard";
        }

        .pfp {
            width: min(250px, 60vw);
            height: min(250px, 60vw);
        }
    }
</style>