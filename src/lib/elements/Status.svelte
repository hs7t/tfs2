<script lang="ts">
    import StatView from './components/StatView.svelte'
    import Ticker from './components/Ticker.svelte'
    import type { StatViewStat } from './components/StatView.svelte'
    import type { Game } from '$lib/logic/game.svelte'

    import { game } from '$lib/logic/shared.svelte'
    let currentGame = $derived(game.current) as Game

    let statViewStats: Array<StatViewStat> = $derived.by(() => {
        return [
            {
                label: 'Wealth',
                value:
                    String(
                        Math.floor(currentGame.currentState.wealth.currency),
                    ) + ' CU',
                featured: false,
            },
            {
                label: 'Matter',
                value:
                    String(Math.floor(currentGame.currentState.wealth.matter)) +
                    ' MT',
                featured: false,
            },
            {
                label: 'Tubip',
                value:
                    String(Math.floor(currentGame.currentState.wealth.tubip)) +
                    ' TB',
                featured: false,
            },
        ]
    })

    let currentHeadline: string = $derived.by(() => {
        let gameNewsUpdates = currentGame.currentState.news.updates
        let currentNewsUpdate = gameNewsUpdates[gameNewsUpdates.length - 1]

        if (currentNewsUpdate == undefined) {
            return "It's a new dawn for tubip manufacturing!"
        }

        return currentNewsUpdate.headline
    })
</script>

<section class="status">
    <Ticker headline={currentHeadline} />
    <div class="stats">
        <StatView stats={statViewStats} />
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
    }
</style>
