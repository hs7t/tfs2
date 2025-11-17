<script lang="ts">
    let { children, action }: { children: any, action: () => void } = $props()
</script>

<button class="large-button" onclick={action}>
    {@render children()}
</button>

<style>
    button {
        all: unset;

        padding: 0.6ch;

        font-size: var(--t-font-size-large);
        font-family: var(--t-font-family-primary);

        background-color: var(--t-color-accent-B);
        border: 3pt solid var(--t-color-accent-C);

        box-shadow: 0pt 3pt 0pt var(--t-color-accent-A);
    }
</style>
