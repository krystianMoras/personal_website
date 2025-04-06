import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let segments = [];

    if (Array.isArray(params.slug)) {
        segments = params.slug;
    } else if (typeof params.slug === 'string') {
        segments = [params.slug];
    }
    
    const slugPath = segments.length ? segments.join('/') : 'index';
	const fullPath = `src/data/blog/${slugPath}.md`;

	if (!fs.existsSync(fullPath)) {
		throw error(404, 'Not found');
	}

	const file = fs.readFileSync(fullPath, 'utf-8');
	const { content, data } = matter(file);

	console.log('File content:', content);
	console.log('File data:', data);

	return {
		content,
		meta: data,
	};
}
