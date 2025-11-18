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
    main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        user-select: none;
    }

    section {
        max-height: 100dvw;
        max-width: 100dvh;

        flex-grow: 1;
        flex-basis: 50%;
        aspect-ratio: 1 / 1;

        display: flex;
        flex-direction: column;
    }
</style>
