<script lang="ts">
    import { goto } from '$app/navigation';
    import { session } from '$app/stores';

    let menuOpen = false
    let menuWrapperElement: HTMLElement

    function windowClickHandler(e: MouseEvent) {
        if (!menuWrapperElement.contains(e.target as Node)) {
            menuOpen = false
        }
    }

    function logout() {
        goto('/logout')
    }
</script>

<svelte:window on:click={windowClickHandler}></svelte:window>

<div class="navbar">
    <div class="logo">
        <div class="logo-image"></div>
        <h1>FlashChem</h1>
    </div>
    <div class="menu-wrapper" bind:this={menuWrapperElement}>
        <div class="icon" on:click={() => menuOpen = !menuOpen}></div>
        <nav class:visible={menuOpen}>
            <a href="/">Home</a>
            <a href="/practice">Practice</a>
            <a href="/about">About</a>
            <a href="/account" style="padding-right: 0">Account</a>
            {#if $session.loggedIn}
                <a href="/" on:click={logout}>Logout</a>
            {:else}
                <a href="/auth/google">Login</a>
            {/if}
        </nav>
    </div>
</div>

<style lang="scss">
    .navbar {
        background: var(--background-2);
        height: 70px;
        box-sizing: border-box;
        width: 100%;
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
    }

    .logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .logo-image {
        width: 40px;
        height: 40px;
        background-image: url('/flashchem.png');
        background-size: cover;
        display: inline-block;
    }

    .icon {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #C4C4C4;
        display: inline-block;
    }

    .menu-wrapper {
        margin-left: auto;
    }

    h1 {
        display: inline-block;
        font-size: 32px;
        font-style: italic;
        font-weight: 700;
        text-decoration: underline;
        margin: 0.25em 0;
        color: var(--text-dark);
    }

    nav {
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        position: absolute;
        top: calc(1em + 40px);
        right: 0em;
        background: var(--background-2);
        padding: 0.5em;
        opacity: 0;
        visibility: hidden;
        transition: opacity linear 0.1s;

        &.visible {
            opacity: 1;
            visibility: visible;
        }

        a {
            font-size: 20px;
            font-weight: 500;
            padding: 0.2em 0.2em;

            &:hover {
                color: var(--emph);
            }
        }
    }
</style>