<script lang="ts">
    import StatView from './components/StatView.svelte'
    import Ticker from './components/Ticker.svelte'
    import type { StatViewStat } from './components/StatView.svelte';
    import { game } from '$lib/logic/game'

    let statViewStats: Array<StatViewStat> = $derived.by(() => {
        return [
            {
                label: "Wealth",
                value: String(game.currentState.wealth.currency) + " CU",
                featured: false
            },
            {
                label: "Matter",
                value: String(game.currentState.wealth.matter) + " MT",
                featured: false
            },
            {
                label: "Tubip",
                value: String(game.currentState.wealth.tubip) + " TB",
                featured: false
            }
        ]
    })
</script>

<section class="status">
    <Ticker headline="This is a test headline. Shocking!" />
    <div class="stats">
        <StatView stats={statViewStats} />
    </div>
</section>
