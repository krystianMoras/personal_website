<svelte:head>
	<title>Recipes</title>
	<meta name="description" content="Recipe list" />
</svelte:head>

<script>
	export let data;
</script>

<ul>
	{#each data.files as file}
		<li>
			<a href={`/recipes/${file.slug}`}>{file.title}</a>
		</li>
	{/each}
</ul>