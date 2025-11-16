<script>
    import InfoBar from './components/InfoBar.svelte'
    import SegmentedButton from './components/SegmentedButton.svelte'
</script>

<div class="market">
    <InfoBar>Something something Vicky something something Janet</InfoBar>
    <SegmentedButton
        options={[
            {
                label: 'Shop',
                action: () => {},
            },
        ]}
    ></SegmentedButton>
</div>
