export async function load({ params }) {
    const post = await import(`../../../lib/recipes/${params.slug.replace('.md', '')}.md`);                   // dynamic import :contentReference[oaicite:14]{index=14}
    return {
      Content: post.default,
      metadata: post.metadata
    };
  }
  