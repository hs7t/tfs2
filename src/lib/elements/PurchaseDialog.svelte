<script lang="ts">
    import type { Item } from '$lib/logic/purchases'
    import { ITEMS } from '$lib/logic/purchases'
    import { game, type Game } from '$lib/logic/shared.svelte'
    import Dialog from './components/Dialog.svelte'
    let { shown = $bindable(false) } = $props()

    type ItemWithAvailability = Item & {
        available: boolean
    }

    const getAvailableItems = (currentGame: Game | undefined) => {
        let result: Array<ItemWithAvailability> = []

        if (currentGame == undefined) return result

        const getItemIds = (items: Array<Item>) => {
            let result: Array<string> = []
            for (let item of items) {
                result.push(item.id)
            }
            return result
        }

        for (let item of ITEMS) {
            let itemAvailable: boolean = false

            if (item.id in getItemIds(currentGame.currentState.items)) {
                itemAvailable = false
            }

            if (item.currencyCost > currentGame.currentState.wealth.currency) {
                itemAvailable = false
            }

            result.push({
                ...item,
                available: itemAvailable,
            })
        }

        return result
    }

    const availableItems = $derived(getAvailableItems(game.current))
</script>

<Dialog title="Purchase" bind:shown>
    {#if game.current}
        {#each availableItems as item}
            <li class={item.available ? 'available' : 'unavailable'}>
                {item.name} ({item.currencyCost})
                <button
                    onclick={() => game.current?.purchase(item)}
                    disabled={!item.available}
                >
                    Purchase
                </button>
            </li>
        {/each}
    {/if}
</Dialog>
