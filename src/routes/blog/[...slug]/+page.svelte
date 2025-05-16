<script>
    export let data;
  </script>
  <article>
    <svelte:component this={data.Content} {...data.metadata}/>
  </article>
  