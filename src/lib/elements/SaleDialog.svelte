<script>
    import { game } from '$lib/logic/shared.svelte'
    import Dialog from './components/Dialog.svelte'
    let { shown = $bindable(false) } = $props()
    let selectedAmount = $state(0)
</script>

<Dialog title="Sell" {shown}>
    <section>
        <input type="number" bind:value={selectedAmount} />
        <button onclick={() => game.current?.sellTubip(selectedAmount)}
            >Sell {selectedAmount} tubip</button
        >
    </section>
</Dialog>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 0.5ch;

        padding: 1ch;
        padding-top: 0;
    }

    input[type='number'],
    button {
        padding: 0.5ch;
        font-size: inherit;
        font-family: inherit;

        border: var(--t-border-primary);
        border-radius: inherit;
    }

    button {
        background-color: var(--t-color-accent-C);
    }
</style>
