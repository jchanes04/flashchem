<script lang="ts">
import Navbar from '$lib/components/Navbar.svelte';

    import NavbarSmall from '$lib/components/NavbarSmall.svelte'

    let windowWidth = 100000;
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if windowWidth > 900}
    <Navbar />
{:else if windowWidth > 650}
    <NavbarSmall />
{:else}
    <div></div>
{/if}
<div class="spacer"></div>
<slot></slot>

<style lang="scss">
    .spacer {
        width: 100%;
        height: 90px;

        @media (max-width: 650px) {
            height: 60px;
        }

        @media (max-width: 900px) {
            height: 80px;
        }
    }
</style>