<script lang="ts">
    import { session } from '$app/stores';
    import DownArrow from '$lib/assets/DownArrow.svelte'

    let accountMenuOpen = false
    let accountWrapperElement: HTMLElement

    function windowClickHandler(e: MouseEvent) {
        if (accountWrapperElement && !accountWrapperElement.contains(e.target as Node)) {
            accountMenuOpen = false
        }
    }
</script>

<svelte:window on:click={windowClickHandler}></svelte:window>

<div class="navbar">
    <a class="logo" href="/">
        <div class="logo-image"></div>
        <h1>FlashChem</h1>
    </a>
    <nav>
        <a href="/practice" rel="external"><div class="link-wrapper">Practice</div></a>
        <a href="/sets"><div class="link-wrapper">View Sets</div></a>
    </nav>
    {#if $session.loggedIn}
        <div class="account-wrapper" bind:this={accountWrapperElement}>
            <div class="icon-wrapper">
                <div class="icon" on:click={() => accountMenuOpen = !accountMenuOpen}></div>
                <span class="down-arrow" on:click={() => accountMenuOpen = !accountMenuOpen}>
                    <DownArrow />
                </span>
            </div>
            <div class="account-menu" class:visible={accountMenuOpen}>
                <a href="/account"><div class="link-wrapper">My Account</div></a>
                <a href="/logout" rel="external"><div class="link-wrapper">Logout</div></a>
            </div>
        </div>
    {:else}
        <a href="/auth/google" rel="external"><div class="link-wrapper">Login</div></a>
    {/if}
</div>

<style lang="scss">
    .navbar {
        background: var(--background-2);
        height: 80px;
        box-sizing: border-box;
        width: 100%;
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 20px;
        z-index: 5;
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

    .icon-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .icon {
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #C4C4C4;
        display: inline-block;
    }

    .down-arrow {
        width: 1.65em;
        height: 1.65em;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        top: 0.25em;
        cursor: pointer;
        padding-left: 0.2em;

        :global(*) {
            height: 100%;
        }
    }

    .account-wrapper {
        position: relative;
    }

    .account-menu {
        position: absolute;
        top: calc(1em + 45px);
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
            font-size: 22px;
            padding: 0.3em 0.4em;
            white-space: nowrap;
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
        display: inline-block;
        font-size: 28px;
        font-weight: 500;
        padding: 0.5em 0.3em;

        &:hover {
            .link-wrapper::after {
                left: 0;
            }
        }
        
        .link-wrapper {
            overflow: hidden;
            position: relative;

            &::after {
                content: '';
                width: 100%;
                height: 3px;
                background-color: var(--text-dark);
                position: absolute;
                bottom: -0.05em;
                left: -100%;
                transition: left 0.15s ease-out;
            };
        }
    }
</style>