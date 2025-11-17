<script lang="ts">
    let { action } = $props()
</script>

<button aria-label="Close" title="Close" onclick={action}>
    <span role="presentation">X</span>
</button>

<style>
    button {
        all: unset;
        font-size: inherit;
        padding: 0.5ch;
        background-color: var(--t-color-accent-A);
        color: var(--t-color-primary);
        border: var(--t-border-primary);
    }
</style>
