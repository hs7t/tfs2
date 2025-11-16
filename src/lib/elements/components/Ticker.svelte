<script lang="ts">
    import { onMount } from 'svelte'
    import { slide } from 'svelte/transition'

    let { headline }: { headline: string } = $props()

    let windowWidth = $state(0)

    const pixelsPerCharacter = 24
    let headlineEstimatedCharacters = $derived(
        headline.length * pixelsPerCharacter,
    )

    let headlineRepetitions = $derived(
        Math.floor(windowWidth / headlineEstimatedCharacters) * 10,
    )

    onMount(() => {
        windowWidth = window.innerWidth
    })
</script>

{#snippet content()}
    <p>{headline}</p>
{/snippet}

<div class="ticker">
    {#each [...Array(headlineRepetitions).keys()] as scrolled}
        {#key headline}
            <span
                class="scrolling"
                id="scrolled-{scrolled}"
                aria-hidden={!(scrolled == 1)}
                transition:slide
            >
                {@render content()}
            </span>
        {/key}
    {/each}
</div>

<style>
    .ticker {
        --gap: 3ch;
        display: flex;
        width: 100%;
        flex-direction: row;
        overflow: hidden;

        white-space: nowrap;
        gap: var(--gap);
    }

    .ticker {
        background-color: var(--t-color-accent-background-A);
        color: var(--t-color-accent-B);
        font-family: var(--t-font-family-primary);
        padding: 0.2ch;
        border-radius: var(--t-radius-primary);
    }

    .ticker .scrolling {
        animation: scroll infinite 1s linear;
        flex-shrink: 0;
        user-select: none;
        text-transform: uppercase;
    }

    @keyframes scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(calc(-100% - var(--gap)));
        }
        /* TYSM, Ryan! https://ryanmulligan.dev/blog/css-marquee/ */
    }
</style>
