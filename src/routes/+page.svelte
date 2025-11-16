<script lang="ts">
    import InfoBar from "$lib/elements/components/InfoBar.svelte"
    import Status from "$lib/elements/Status.svelte"
    import { onMount } from "svelte"
    import { fetchGame, type Game } from "./shared.svelte"
    import Fabrication from "$lib/elements/Fabrication.svelte"
    import Market from "$lib/elements/Market.svelte"
    
    let game: Game
    let loadingState = true

    onMount(() => {
        game = fetchGame()
        loadingState = false
    })
</script>

<main>
    {#if loadingState == true}
        <p>Loading!</p>
    {:else}
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
            <Market />
        </section>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
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