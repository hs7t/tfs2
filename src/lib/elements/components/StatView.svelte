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
    <div class="featured-stats">
        <ul>
            {#each separatedStats.featured as featuredStat}
                <li>
                    {featuredStat.label}
                    {featuredStat.value}
                </li>
            {/each}
        </ul>
    </div>

    <div class="regular-stats">
        <ul>
            {#each separatedStats.regular as regularStat}
                <li>
                    {regularStat.label}
                    {regularStat.value}
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .stat-view {
        flex-grow: 1;
    }
</style>
