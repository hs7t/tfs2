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
                action: () => {},
            },
            {
                label: 'Shop',
                action: () => {
                    uiState.purchaseDialogShown = true
                },
            },
        ]}
    ></SegmentedButton>
</div>
