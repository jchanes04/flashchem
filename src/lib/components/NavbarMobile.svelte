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
</script>

<svelte:window on:click={windowClickHandler}></svelte:window>

<div class="navbar">
    <a class="logo" href="/">
        <div class="logo-image"></div>
        <h1>FlashChem</h1>
    </a>
    <div class="menu-wrapper" bind:this={menuWrapperElement}>
        <div class="icon" on:click={() => menuOpen = !menuOpen}></div>
        <nav class:visible={menuOpen}>
            <a href="/practice"><div class="link-wrapper">Practice</div></a>
            <a href="/sets"><div class="link-wrapper">View Sets</div></a>
            {#if $session.loggedIn}
                <a href="/account"><div class="link-wrapper">My Account</div></a>
                <a href="/logout" rel="external"><div class="link-wrapper">Logout</div></a>
            {:else}
                <a href="/auth/google" rel="external"><div class="link-wrapper">Login</div></a>
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
        z-index: 5;
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
        z-index: 5;

        &.visible {
            opacity: 1;
            visibility: visible;
        }

        a {
            font-size: 20px;
            font-weight: 500;
            padding: 0.2em 0.2em;
            display: inline-block;

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
    }
</style>