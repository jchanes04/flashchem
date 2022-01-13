<script lang="ts">
import Navbar from '$lib/components/Navbar.svelte';
import NavbarMobile from '$lib/components/NavbarMobile.svelte';

    import NavbarSmall from '$lib/components/NavbarSmall.svelte'

    let windowWidth = 100000;
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if windowWidth > 900}
    <Navbar />
{:else if windowWidth > 650}
    <NavbarSmall />
{:else}
    <NavbarMobile />
{/if}
<slot></slot>