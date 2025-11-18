<script>
    import { game } from '$lib/logic/shared.svelte'
    import Dialog from './components/Dialog.svelte'
    let { shown = $bindable(false) } = $props()
    let selectedAmount = $state(0)
</script>

<Dialog title="Sell" {shown}>
    <input type="number" bind:value={selectedAmount} />
    <button onclick={() => game.current?.sellTubip(selectedAmount)}
        >Sell {selectedAmount} tubip</button
    >
</Dialog>
