import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import sharp from 'sharp';


const projectRoot = process.cwd();
const recipesDir = path.join(projectRoot, 'src/lib/blog');
const thumbsDir = path.join(projectRoot, 'static', 'thumbnails');
fs.mkdirSync(thumbsDir, { recursive: true });
const outFile = path.join(projectRoot, 'src/lib/blogPreview.json');


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



async function generate() {
  const summaries = [];
  const files = fs.readdirSync(recipesDir).filter(f => f.endsWith('.md'));

  for (const filename of files) {
    const slug = path.basename(filename);
    const fullPath = path.join(recipesDir, filename);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(raw);


    const excerpt = extractFirstParagraph(content);

    summaries.push({
      slug,
      ...data,
      excerpt,
    });
  }

  fs.writeFileSync(outFile, JSON.stringify(summaries, null, 2));
  console.log(`Wrote ${summaries.length} previews to ${outFile}`);
}

generate().catch(err => { console.error(err); process.exit(1); });