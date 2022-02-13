<script lang="ts">
    import { page } from "$app/stores";

    import SignupForm from "$lib/components/SignupForm.svelte";
</script>

<main>
    <h1>Account Information</h1>
    <SignupForm hash={$page.url.searchParams.get('hash')} />
</main>

<style lang="scss">
    main {
        background: var(--background-3);
        border-radius: 15px;
        color: var(--text-light);
        width: 80vw;
        max-width: 600px;
        margin: auto;
        padding: 1.5em;
    }

    h1 {
        font-size: 40px;
        text-align: center;
        margin: 0 0 0.5em;
    }
</style>