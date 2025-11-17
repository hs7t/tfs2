<script lang="ts">
    let { stats }: { stats: Array<StatViewStat> } = $props()

    export type StatViewStat = {
        label: string
        value: string
        featured: boolean
    }

    const separateStatsByFeaturedStatus = (stats: Array<StatViewStat>) => {
        let regularStats = []
        let featuredStats = []

        for (let stat of stats) {
            if (stat.featured) {
                featuredStats.push(stat)
            } else {
                regularStats.push(stat)
            }
        }

        return {
            regular: regularStats,
            featured: featuredStats,
        }
    }

    let separatedStats = $derived(separateStatsByFeaturedStatus(stats))
</script>

<div class="stat-view">
    <ul class="stat-group featured">
        {#each separatedStats.featured as featuredStat}
            <li class="stat">
                {featuredStat.label}
                {featuredStat.value}
            </li>
        {/each}
    </ul>

    <ul class="stat-group regular">
        {#each separatedStats.regular as regularStat}
            <li class="stat">
                {regularStat.label}
                {regularStat.value}
            </li>
        {/each}
    </ul>
</div>

<style>
    .stat-view {
        flex-grow: 1;
        padding: 0.8ch;
    }

    .stat-group {
        all: unset;
        display: flex;
        flex-direction: column;
        gap: 0.2ch;
    }

    .stat {
        padding: 0.4ch;
        width: 100%;
        background-color: red;
    }
</style>
