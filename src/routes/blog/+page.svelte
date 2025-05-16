<script>
  export let data;
</script>

<style>
  .post-row {
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
    font-family: system-ui, sans-serif;
  }
  .post-title {
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
    color: #000;
  }
  .post-excerpt {
    display: block;
    color: #666;
    font-size: 0.9em;
    margin-top: 4px;
  }
</style>

<div>
  {#each data.posts as post}
    <div class="post-row">
      <a class="post-title" href={`/blog/${post.slug}`}>
        {post.slug.replace('.md', '')}
      </a>
      <span class="post-excerpt">{post.excerpt}</span>
    </div>
  {/each}
</div>
