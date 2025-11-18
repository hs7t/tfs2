<script lang="ts">
    import type { Item } from '$lib/logic/purchases'
    import { ITEMS } from '$lib/logic/purchases'
    import { game, type Game } from '$lib/logic/shared.svelte'
    import Dialog from './components/Dialog.svelte'
    let { shown = $bindable(false) } = $props()

    let shopItems = [] as Array<Item>

    const getAvailableItems = (currentGame: Game | undefined) => {
        let result: Array<Item> = []

        if (currentGame == undefined) return result

        for (let item of ITEMS) {
            const getItemIds = (items: Array<Item>) => {
                let result: Array<string> = []
                for (let item of items) {
                    result.push(item.id)
                }
                return result
            }

            if (item.id in getItemIds(currentGame.currentState.items)) {
                continue
            }

            result.push(item)
        }

        return result
    }

    const availableItems = $derived(getAvailableItems(game.current))
</script>

<Dialog title="Purchase" bind:shown>
    {#each availableItems as item}
        <li>
            {item.name} ({item.currencyCost})
            <button onclick={() => game.current?.purchase(item)}
                >Purchase</button
            >
        </li>
    {/each}
</Dialog>
