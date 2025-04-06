<script>
    import SvelteMarkdown from 'svelte-markdown'
    export let data;

  </script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<article class="markdown">
  
	<SvelteMarkdown source={data.content}></SvelteMarkdown>
</article>

<style>
	.markdown {

	}
</style>
