<script lang="ts">
    import InfoBar from '$lib/elements/components/InfoBar.svelte'
    import Status from '$lib/elements/Status.svelte'
    import { onDestroy, onMount } from 'svelte'
    import {
        appEvents,
        MainMountedEvent,
        MainUnmountedEvent,
        game,
    } from '$lib/logic/shared.svelte'
    import Fabrication from '$lib/elements/Fabrication.svelte'
    import Market from '$lib/elements/Market.svelte'
    import PurchaseDialog from '$lib/elements/PurchaseDialog.svelte'
    import SaleDialog from './SaleDialog.svelte'

    export let uiState = {
        purchaseDialogShown: false,
        saleDialogShown: false,
    }
    let loadingState = true

    onMount(() => {
        appEvents.dispatchEvent(MainMountedEvent)
        loadingState = false
    })

    onDestroy(() => {
        appEvents.dispatchEvent(MainUnmountedEvent)
    })
</script>

<main>
    {#if loadingState == true}
        <p>Loading!</p>
    {:else if game != undefined}
        <section class="information">
            <InfoBar>
                <p>Tubip Fabrication Simulator</p>
            </InfoBar>
            <Status />
        </section>
        <section>
            <InfoBar>
                <p><a href=".">About</a></p>
                <p><a href=".">How to play</a></p>
            </InfoBar>
            <Fabrication />
            <Market bind:uiState />
        </section>
        <PurchaseDialog bind:shown={uiState.purchaseDialogShown} />
        <SaleDialog bind:shown={uiState.saleDialogShown} />
    {/if}
</main>

<style>
    :global(body) {
        width: 100dvw;
        height: 100dvh;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    main {
        display: flex;
        flex-direction: row;
        user-select: none;
        width: 80dvw;
        max-height: 80dvh;
        aspect-ratio: 2 / 1;
        gap: 0.5ch;
        overflow: hidden;
    }

    section {
        display: flex;
        flex-direction: column;

        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 50%;
        aspect-ratio: 1 / 1;
        padding: 0.5ch;
        gap: 0.5ch;

        min-width: 0;
        overflow: auto;

        border: var(--t-border-primary);
    }

    @media (max-width: 700pt) {
        main {
            flex-direction: column;

            max-width: 100dvw;
            max-height: 100dvh;
            aspect-ratio: 1 / 2;
        }

        section {
            min-height: 50dvh;
        }

        section.information {
            max-width: none;
        }
    }
</style>
