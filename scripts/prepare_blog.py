import os
from pathlib import Path
import json
import yaml
from mistune import create_markdown

# Project root directory
project_root = Path(__file__).resolve().parent.parent
# Input and output paths
recipes_dir = project_root / 'src' / 'lib' / 'blog'
out_file = project_root / 'src' / 'lib' / 'blogPreview.json'

# Create a Markdown parser for AST extraction
markdown_parser = create_markdown(renderer='ast')

def parse_frontmatter(raw_text: str):
    if raw_text.startswith('---'):
        parts = raw_text.split('---', 2)
        if len(parts) >= 3:
            fm_text = parts[1]
            content = parts[2].lstrip('\n')
            metadata = yaml.safe_load(fm_text) or {}
            return metadata, content
    return {}, raw_text

def extract_first_paragraph(markdown_text):
    ast = markdown_parser(markdown_text)
    for node in ast:
        if node.get('type') == 'paragraph':
            texts = [child.get('text', '') for child in node.get('children', []) if child.get('type') == 'text']
            if texts:
                return ''.join(texts).strip()
    return ''

def generate():
    summaries = []

    for md_file in recipes_dir.glob('*.md'):
        raw = md_file.read_text(encoding='utf-8')
        metadata, content = parse_frontmatter(raw)

        excerpt = extract_first_paragraph(content)

        summary = {
            'slug': md_file.stem,
            **metadata,
            'excerpt': excerpt,
        }

        summaries.append(summary)

    out_file.write_text(json.dumps(summaries, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Wrote {len(summaries)} previews to {out_file}")

if __name__ == '__main__':
    generate()
