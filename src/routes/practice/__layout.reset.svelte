<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import NavbarMobile from '$lib/components/NavbarMobile.svelte';
    import NavbarSmall from '$lib/components/NavbarSmall.svelte'

    let windowWidth = 100000;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div id="page">
    {#if windowWidth > 900}
        <Navbar />
    {:else if windowWidth > 650}
        <NavbarSmall />
    {:else}
        <NavbarMobile />
    {/if}
    <slot></slot>
</div>

<style lang="scss">
    #page {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
    }
</style>