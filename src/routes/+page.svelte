<script lang="ts">
    import InfoBar from "$lib/elements/components/InfoBar.svelte"
    import Status from "$lib/elements/Status.svelte"
    import { onMount } from "svelte"
    import { fetchGame, type Game } from "./shared.svelte"
    
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
        <InfoBar>
            <p>Tubip Fabrication Simulator</p>
        </InfoBar>
        <Status />
    {/if}
</main>