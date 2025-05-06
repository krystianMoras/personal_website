// src/routes/posts/+page.server.js
import fs from 'fs';
import path from 'path';

let cachedPreviews = null;

function loadPreviewsOnce() {
  if (!cachedPreviews) {
    const filePath = path.resolve('src/lib/recipesPreview.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    cachedPreviews = JSON.parse(rawData);
  }
  return cachedPreviews;
}

export function load() {
  const previews = loadPreviewsOnce();
  const posts = [...previews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return { posts };
}
