<script lang="ts">
    let { children } = $props()
</script>

<div class="info-bar">
    {@render children()}
</div>

<style>
    .info-bar {
        width: 100%;

        align-items: center;
        justify-items: center;
        justify-content: space-between;
    }
</style>
