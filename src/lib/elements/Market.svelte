<script>
    import { gameEvents } from '$lib/logic/game.svelte'
    import { game } from '$lib/logic/shared.svelte'
    import InfoBar from './components/InfoBar.svelte'
    import SegmentedButton from './components/SegmentedButton.svelte'

    let { uiState = $bindable() } = $props()

    let currentNotification = $derived.by(() => {
        let latestLog =
            game.current?.currentState.happeningLogs[
                game.current.currentState.happeningLogs.length - 1
            ]
        if (latestLog == undefined) return 'Updates will appear here'

        return `${latestLog.actionTarget} ${latestLog.actionType} ${latestLog.factor || ''} at T${latestLog.tickstamp}`
    })
</script>

<div class="market">
    <InfoBar>{currentNotification}</InfoBar>

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
