<script>
    import LargeButton from './components/LargeButton.svelte'
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
