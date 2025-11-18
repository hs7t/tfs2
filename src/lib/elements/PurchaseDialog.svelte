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
    <section class="item-list">
        {#each availableItems as item}
            <li class={item.available ? 'available item' : 'unavailable item'}>
                <h3 class="name">{item.name}</h3>
                <p class="description">{item.description}</p>
                <p class="price">Costs {item.currencyCost} CU.</p>
                <button
                    onclick={() => game.current?.purchase(item)}
                    disabled={!item.available}
                >
                    Purchase
                </button>
            </li>
        {/each}
    </section>
</Dialog>

<style>
    .item-list {
        all: unset;
        display: flex;
        flex-direction: column;

        gap: 1ch;
        padding: 1ch;
        padding-top: 0;
    }

    .item-list .item {
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        gap: 0.5ch;
        padding: 1ch;
        border: var(--t-border-primary);

        background-color: var(--t-color-accent-B);
    }

    .item-list .item.unavailable {
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 15px,
            rgb(69, 69, 69) 15px,
            rgb(69, 69, 69) 16.5px
        );
    }

    .item-list .item h3,
    .item-list .item p {
        width: 100%;

        font-size: var(--t-font-size-primary);
    }

    button {
        padding: 0.8ch;
        background-color: var(--t-color-accent-A);
        border: var(--t-border-primary);
        font-weight: 500;
    }
</style>
