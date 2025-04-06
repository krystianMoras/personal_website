import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export function load() {
	const notesDir = 'src/data/recipes';

	const files = getMarkdownFiles(notesDir).map((filepath) => {
		const relativePath = filepath.replace(`${notesDir}/`, '');
		const slug = relativePath.replace(/\.md$/, '');

		return {
			title: slug.split('/').pop().replace(/-/g, ' '), // Basic filename → title
			slug
		};
	});

	return { files };
}

function getMarkdownFiles(dir, results = []) {
	for (const file of fs.readdirSync(dir)) {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			getMarkdownFiles(fullPath, results);
		} else if (file.endsWith('.md')) {
			results.push(fullPath);
		}
	}
	return results;
}
