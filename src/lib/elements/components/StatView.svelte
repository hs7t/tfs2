<script lang="ts">
    import { slide } from 'svelte/transition'

    let {
        stats,
        statColours = [
            'var(--t-color-accent-B)',
            'var(--t-color-accent-C)',
            'var(--t-color-accent-A)',
        ],
    }: { stats: Array<StatViewStat>; statColours?: Array<String> } = $props()

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
        {#each separatedStats.featured as featuredStat, index}
            <li class="stat">
                <span>
                    {featuredStat.label}
                </span>
                {#key featuredStat}
                    <span transition:slide={{ duration: 100 }}>
                        {featuredStat.value}
                    </span>
                {/key}
            </li>
        {/each}
    </ul>

    <ul class="stat-group regular">
        {#each separatedStats.regular as regularStat, index}
            <li
                class="stat"
                style={`color: ${statColours[index % statColours.length]}`}
            >
                <span>
                    {regularStat.label}
                </span>
                <span>
                    {#key regularStat.value}
                        <span transition:slide={{ duration: 200 }}>
                            {regularStat.value}
                        </span>
                    {/key}
                </span>
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
        background-color: var(--t-color-accent-background-B);

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .stat span {
        display: flex;
        flex-direction: column;
    }
</style>
