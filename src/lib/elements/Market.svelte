<script>
    import InfoBar from './components/InfoBar.svelte'
    import SegmentedButton from './components/SegmentedButton.svelte'

    let { uiState = $bindable() } = $props()
</script>

<div class="market">
    <InfoBar>Something something Vicky something something Janet</InfoBar>
    <SegmentedButton
        options={[
            {
                label: 'Sell',
                action: () => {
                    uiState.saleDialogShown = true
                },
            },
            {
                label: 'Purchase',
                action: () => {
                    uiState.purchaseDialogShown = true
                },
            },
        ]}
    ></SegmentedButton>
</div>

<style>
    .market {
        display: flex;
        flex-direction: column;
        gap: 0.5ch;
    }
</style>
