<script lang="ts">

</script>

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
    <div class="icon"></div>
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

    .logo-image, .icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #C4C4C4;
        display: inline-block;
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

        a {
            font-size: 28px;
            font-weight: 500;
            padding: 0.5em 0.3em;

            &:hover {
                color: var(--emph);
            }
        }
    }
</style>