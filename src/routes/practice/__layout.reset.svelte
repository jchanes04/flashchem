<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import NavbarMobile from '$lib/components/NavbarMobile.svelte';
    let windowWidth = 100000;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div id="page">
    {#if windowWidth > 700}
        <Navbar />
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