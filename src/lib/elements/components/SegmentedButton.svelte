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
</style>
