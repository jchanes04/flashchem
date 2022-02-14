<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import NavbarMobile from '$lib/components/NavbarMobile.svelte';

    let windowWidth = 100000;
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if windowWidth > 730}
    <Navbar />
{:else}
    <NavbarMobile />
{/if}
<slot></slot>