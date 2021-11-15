<script lang="ts">
    import { goto } from '$app/navigation';
    import { session } from '$app/stores';

    let accountMenuOpen = false
    let accountWrapperElement: HTMLElement

    function windowClickHandler(e: MouseEvent) {
        if (accountWrapperElement && !accountWrapperElement.contains(e.target as Node)) {
            accountMenuOpen = false
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
    <nav>
        <a href="/">Home</a>
        <a href="/practice">Practice</a>
        <a href="/about">About</a>
        <a href="/account">Account</a>
    </nav>
    {#if $session.loggedIn}
        <div class="account-wrapper" bind:this={accountWrapperElement}>
            <div class="icon" on:click={() => accountMenuOpen = !accountMenuOpen}></div>
            <div class="account-menu" class:visible={accountMenuOpen}>
                <a href="/" on:click={logout}>Logout</a>
            </div>
        </div>
    {:else}
        <a href="/auth/google">Login</a>
    {/if}
</div>

<style lang="scss">
    .navbar {
        background: var(--background-2);
        height: 80px;
        box-sizing: border-box;
        width: 100%;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 20px;
    }

    .logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
    }

    .logo-image {
        width: 50px;
        height: 50px;
        background-image: url('/flashchem.png');
        background-size: cover;
        display: inline-block;
    }

    .icon {
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #C4C4C4;
        display: inline-block;
    }

    .account-wrapper {
        position: relative;
    }

    .account-menu {
        position: absolute;
        top: calc(1em + 50px);
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
    }

    h1 {
        display: inline-block;
        font-size: 40px;
        font-style: italic;
        font-weight: 700;
        text-decoration: underline;
        margin: 0.5em 0;
        color: var(--text-dark);
    }

    nav {
        margin-left: auto;
        margin-right: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    a {
        font-size: 28px;
        font-weight: 500;
        padding: 0.5em 0.3em;
        transition: color 0.1s linear;

        &:hover {
            color: var(--emph);
        }
    }
</style>