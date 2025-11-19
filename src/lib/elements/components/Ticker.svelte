<script lang="ts">
    import { onMount } from 'svelte'
    import { slide } from 'svelte/transition'

    let { headline }: { headline: string } = $props()

    let windowWidth = $state(1920)

    const pixelsPerCharacter = 24

    let headlineRepetitions = 12

    $effect(() => {
        windowWidth = window.innerWidth
    })

    $effect(() => {
        console.log('Headline update, ', headline)
    })
</script>

<div class="ticker">
    {#each [...Array(headlineRepetitions).keys()] as scrolled}
        <span
            class="scrolling"
            id="scrolled-{scrolled}"
            aria-hidden={!(scrolled == 1)}
        >
            <p>{headline}</p>
        </span>
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
        padding: 0.2ch;
        border-radius: var(--t-radius-primary);
    }

    .ticker .scrolling {
        animation: scroll infinite 4s linear;
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
