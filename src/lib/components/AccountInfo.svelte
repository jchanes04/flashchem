<script lang="ts">
    export let userData; 

</script>

<div class="info">
    <h1>{userData.username}</h1>
</div>

<style lang="scss">
    .info {
        width: 100%;
        height: 100%;
        background: var(--background-3);
        border-radius: 15px;
        grid-area: info;
    }

    h1 {
        font-size: 40px;
        margin-left: 1.5em;
        color: var(--text-light);
    }
</style>