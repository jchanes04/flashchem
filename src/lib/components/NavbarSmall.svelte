<script lang="ts">
    import { goto } from '$app/navigation';
import { session } from '$app/stores';

    let accountMenuOpen = false
    let accountWrapperElement: HTMLElement

    function windowClickHandler(e: MouseEvent) {
        if (!accountWrapperElement.contains(e.target as Node)) {
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
        <a href="/account" style="padding-right: 0">Account</a>
        <div class="account-wrapper" bind:this={accountWrapperElement}>
            <div class="arrow-wrapper" on:click={() => accountMenuOpen = !accountMenuOpen}>
                <span class="menu-arrow"></span>
            </div>
            <div class="account-menu" class:visible={accountMenuOpen}>
                {#if $session.loggedIn}
                    <a href="/" on:click={logout}>Logout</a>
                {:else}
                    <a href="/auth/google">Login</a>
                {/if}
            </div>
        </div>
    </nav>
</div>

<style lang="scss">
    .navbar {
        background: var(--background-2);
        height: 70px;
        box-sizing: border-box;
        width: 100%;
        position: fixed;
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
        border-radius: 50%;
        background: #C4C4C4;
        display: inline-block;
    }

    .arrow-wrapper {
        display: inline-grid;
        cursor: pointer;
        padding: 0.75em 0.5em 0.75em 0;
        place-content: center;

        &:hover {
            .menu-arrow {
                background: var(--emph);
            }
        }
    }

    .menu-arrow {
        display: inline-block;
        vertical-align: baseline;
        width: 1em;
        height: 1em;
        background: var(--text-dark);
        clip-path: polygon(0 50%, 50% 85%, 100% 50%, 88.25% 32.2%, 50% 60%, 11.75% 32.2%);
    }

    .account-menu {
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
        flex-direction: row;
        align-items: center;
        gap: 5px;

        a {
            font-size: 24px;
            font-weight: 500;
            padding: 0.5em 0.3em;

            &:hover {
                color: var(--emph);
            }
        }
    }
</style>