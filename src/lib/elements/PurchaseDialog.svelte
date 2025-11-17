<script>
    import Dialog from './components/Dialog.svelte'
    let { shown = $bindable(false) } = $props()
</script>

<Dialog title="shop" bind:shown>
    <div>Hello, world!</div>
</Dialog>
