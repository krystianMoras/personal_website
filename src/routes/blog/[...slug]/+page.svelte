<script>
    import SvelteMarkdown from 'svelte-markdown'
    export let data;

    let content = data.content;
  </script>

<svelte:head>
	<title>{'Note'}</title>
</svelte:head>

<article class="markdown">
  
	<SvelteMarkdown source={content}></SvelteMarkdown>
</article>

<style>
	.markdown {

	}
</style>
