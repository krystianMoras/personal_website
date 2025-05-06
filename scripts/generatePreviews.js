// scripts/generatePreviews.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import sharp from 'sharp';

// Project root directory
const projectRoot = process.cwd();
// Directory containing your markdown recipes
const recipesDir = path.join(projectRoot, 'src/lib/recipes');
// Directory to output thumbnails (inside static for direct serving)
const thumbsDir = path.join(projectRoot, 'static', 'thumbnails');
// Ensure thumbnail directory exists
fs.mkdirSync(thumbsDir, { recursive: true });
// Output JSON file path
const outFile = path.join(projectRoot, 'src/lib/recipesPreview.json');

// Function to extract first real text paragraph using AST
function extractFirstParagraph(markdown) {
  const tree = unified().use(remarkParse).parse(markdown);
  const paraNode = tree.children.find(
    node => node.type === 'paragraph' && node.children.some(c => c.type === 'text')
  );
  return paraNode
    ? paraNode.children.map(c => c.value || '').join('').trim()
    : '';
}

// Resolve a markdown image reference to an absolute filesystem path
function resolveImageFsPath(imagePath, markdownFilePath) {
  return path.isAbsolute(imagePath)
    ? imagePath
    : path.resolve(path.dirname(markdownFilePath), imagePath);
}

// Generate a thumbnail and return its URL path (project-root relative)
async function makeThumbnail(absFsPath, slug) {
  console.log(`Generating thumbnail for ${absFsPath}`);
  const ext = path.extname(absFsPath);
  const name = path.basename(absFsPath, ext);
  const thumbName = `${name.replace(/\s+/g, '_')}-thumb${ext}`;
  const thumbFsPath = path.join(thumbsDir, thumbName);

  await sharp(absFsPath)
    .resize({ width: 300 })
    .toFile(thumbFsPath);

  // return path relative to static directory
  const relPath = path.relative(path.join(projectRoot, 'static'), thumbFsPath);
  return '/' + relPath.split(path.sep).join('/');
}

async function generate() {
  const summaries = [];
  const files = fs.readdirSync(recipesDir).filter(f => f.endsWith('.md'));

  for (const filename of files) {
    const slug = path.basename(filename, '.md');
    const fullPath = path.join(recipesDir, filename);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(raw);

    // First image match
    const imgMatch = content.match(/!\[.*?\]\((.*?)\)/);
    let originalImage = imgMatch ? imgMatch[1] : null;
    let firstImageUrl = null;

    if (originalImage) {
      // absolute FS path
      const absImg = resolveImageFsPath(originalImage, fullPath);

      // check if image exists
      if (!fs.existsSync(absImg)) {
        console.warn(`Image not found: ${absImg}`);
        originalImage = null;
      }
      else {
      // thumbnail URL
      firstImageUrl = await makeThumbnail(absImg, slug);
      // if thumbnail fails, fallback to original relative path
      if (firstImageUrl) {
        const updatedContent = content.replace(
          imgMatch[0],
          `![Thumbnail](${firstImageUrl})`
        );
        fs.writeFileSync(fullPath, matter.stringify(updatedContent, data));
      }
      }

    }

    const excerpt = extractFirstParagraph(content);

    summaries.push({
      slug,
      ...data,
      firstImage: firstImageUrl,
      excerpt,
    });
  }

  fs.writeFileSync(outFile, JSON.stringify(summaries, null, 2));
  console.log(`Wrote ${summaries.length} previews to ${outFile}`);
}

generate().catch(err => { console.error(err); process.exit(1); });
