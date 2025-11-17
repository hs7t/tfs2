<script lang="ts">
    type SegmentedButtonOption = {
        label: string
        action: () => void
    }

    let { options }: { options: Array<SegmentedButtonOption> } = $props()
</script>

<div class="segmented-button">
    {#each options as option}
        <button onclick={option.action}>{option.label}</button>
    {/each}
</div>

<style>
    .segmented-button {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .segmented-button button {
        padding: 0.6ch;
        font-family: var(--t-font-family-primary);
        font-size: var(--t-font-size-primary);

        flex-grow: 1;
    }

    .segmented-button button {
        background-color: var(--t-color-accent-B);
        border: var(--t-border-primary);
        border-right: none;
        border-left: none;
    }

    .segmented-button button:first-child {
        background-color: var(--t-color-accent-A);
        border: var(--t-border-primary);
        border-right: none;
    }
    .segmented-button button:last-child {
        background-color: var(--t-color-accent-C);
        border: var(--t-border-primary);
    }
</style>
