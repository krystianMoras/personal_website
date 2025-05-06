<script>
  export let data;
</script>

<h1>All Recipes</h1>

<div class="grid">
  {#each data.posts as post}
    <div class="card">
      <a class="card-link" href={`/recipes/${post.slug}`}>        
        <div class="card-image">
          {#if post.firstImage}
            <img src={post.firstImage} alt={post.slug} />
          {/if}
        </div>
        <div class="card-content">
          <h2 class="card-title">{post.slug}</h2>
          <p class="card-excerpt">{post.excerpt}</p>
        </div>
      </a>
    </div>
  {/each}
</div>

<style>
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 0;
    margin: 0;
  }

  .card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card-link {
    color: inherit;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .card-image img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
  }

  .card-content {
    padding: 0.75rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
  }

  .card-excerpt {
    font-size: 0.9rem;
    color: #555;
    flex-grow: 1;
  }
</style>
