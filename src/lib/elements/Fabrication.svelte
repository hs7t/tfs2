<script lang="ts">
    import type { Game } from '$lib/logic/game.svelte'
    import LargeButton from './components/LargeButton.svelte'
    import { game } from '$lib/logic/shared.svelte'
</script>

<div class="fabrication">
    <LargeButton
        action={() => {
            game.current?.generateTubip()
        }}>Fabricate</LargeButton
    >

    {game.current?.currentState.wealth.tubip}
</div>

<style>
    .fabrication {
        flex-grow: 1;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
