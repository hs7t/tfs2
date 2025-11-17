<script lang="ts">
    let { children } = $props()
</script>

<div class="info-bar">
    {@render children()}
</div>

<style>
    .info-bar {
        width: 100%;

        display: flex;
        flex-direction: row;

        align-items: center;
        justify-items: center;
        justify-content: space-evenly;

        overflow-x: auto;

        padding: 0.2ch;
        gap: 3ch;
    }
</style>
