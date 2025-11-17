<script lang="ts">
    let favicon = `
		data:image/svg+xml,
		<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>
			<text y=%22.9em%22 font-size=%2290%22>🏭</text>
		</svg>
	`
    import '$lib/styling/style.css'

    let { children } = $props()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Mono:ital,wght@0,300..700;1,300..700&display=swap"
        rel="stylesheet"
    />
</svelte:head>

{@render children()}
