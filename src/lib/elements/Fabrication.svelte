<script lang="ts">
    import type { Game } from '$lib/logic/game'
    import LargeButton from './components/LargeButton.svelte'

    let { game = $bindable() as Game } = $props()
</script>

<div class="fabrication">
    <LargeButton action={() => {}}>Fabricate</LargeButton>
</div>

<style>
    .fabrication {
        flex-grow: 1;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
