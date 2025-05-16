import os
from pathlib import Path
import re
import json
import yaml
from PIL import Image
from mistune import create_markdown

# Project root directory
t = Path(__file__).resolve().parent.parent
# Directory containing your markdown recipes
recipes_dir = t / 'src' / 'lib' / 'recipes'
# Directory to output thumbnails (inside static for direct serving)
thumbs_dir = t / 'static' / 'thumbnails'
thumbs_dir.mkdir(parents=True, exist_ok=True)
# Output JSON file path
out_file = t / 'src' / 'lib' / 'recipesPreview.json'

# Create a Markdown instance that outputs an AST
downstream = create_markdown(renderer='ast')

# Function to extract first real text paragraph using AST
def extract_first_paragraph(markdown_text):
    ast = downstream(markdown_text)
    for node in ast:
        if node.get('type') == 'paragraph':
            texts = [child.get('text', '') for child in node.get('children', []) if child.get('type') == 'text']
            if texts:
                return ''.join(texts).strip()
    return ''

# Resolve a markdown image reference to an absolute filesystem path
def resolve_image_fs_path(image_path: str, markdown_file: Path) -> Path:
    p = Path(image_path)
    return p if p.is_absolute() else (markdown_file.parent / p).resolve()

# Generate a thumbnail and return its URL path (project-root relative)
def make_thumbnail(abs_fs_path: Path) -> str:
    print(f"Generating thumbnail for {abs_fs_path}")
    name = abs_fs_path.stem.replace(' ', '_')
    ext = abs_fs_path.suffix
    thumb_name = f"{name}-thumb{ext}"
    thumb_fs_path = thumbs_dir / thumb_name

    with Image.open(abs_fs_path) as img:
        img.thumbnail((300, img.height))
        img.save(thumb_fs_path)

    # return path relative to static directory
    rel = thumb_fs_path.relative_to(t / 'static')
    return '/' + '/'.join(rel.parts)

# Parse frontmatter manually
def parse_frontmatter(raw_text: str):
    if raw_text.startswith('---'):
        parts = raw_text.split('---', 2)
        if len(parts) >= 3:
            fm_text = parts[1]
            content = parts[2].lstrip('\n')
            metadata = yaml.safe_load(fm_text) or {}
            return metadata, content
    return {}, raw_text

# Dump frontmatter manually
def dump_frontmatter(metadata: dict, content: str) -> str:
    fm = yaml.safe_dump(metadata, sort_keys=False).strip()
    return f"---\n{fm}\n---\n\n{content.strip()}\n"


def generate():
    summaries = []
    for md_file in recipes_dir.glob('*.md'):
        raw = md_file.read_text(encoding='utf-8')
        metadata, content = parse_frontmatter(raw)

        # First image match
        img_match = re.search(r'!\[.*?\]\((.*?)\)', content)
        first_image_url = None

        if img_match:
            orig = img_match.group(1)
            abs_img = resolve_image_fs_path(orig, md_file)
            if not abs_img.exists():
                print(f"Image not found: {abs_img}")
            else:
                first_image_url = make_thumbnail(abs_img)
                new_content = content.replace(
                    img_match.group(0),
                    f"![Thumbnail]({first_image_url})"
                )
                content = new_content
                # overwrite markdown file
                updated = dump_frontmatter(metadata, content)
                md_file.write_text(updated, encoding='utf-8')

        excerpt = extract_first_paragraph(content)

        summary = {
            'slug': md_file.stem,
            **metadata,
            'firstImage': first_image_url,
            'excerpt': excerpt,
        }
        summaries.append(summary)

    out_file.write_text(json.dumps(summaries, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Wrote {len(summaries)} previews to {out_file}")

if __name__ == '__main__':
    generate()
