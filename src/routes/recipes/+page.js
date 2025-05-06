// src/routes/posts/+page.server.js
import previews from '$lib/recipesPreview.json';

export function load() {
  // sort by date (assuming frontmatter `date` is ISO‑string)
  const posts = [...previews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return { posts };
}
