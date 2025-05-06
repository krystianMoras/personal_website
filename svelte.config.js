import adapter from '@sveltejs/adapter-static';              // static adapter
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';                             // mdsvex preprocessor
import mdsvexRelativeImages from 'mdsvex-relative-images';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Include both .svelte and .svx/.md extensions
  extensions: ['.svelte', '.svx', '.md'],                    // allow .md/.svx pages :contentReference[oaicite:4]{index=4}

  preprocess: [
    vitePreprocess(),
    mdsvex({                                              
      extensions: ['.svx', '.md'],                          // treat .md as mdsvex too :contentReference[oaicite:5]{index=5}
      layout: {
        // optional: apply a Svelte layout to all mdsvex pages
        // recipes: 'src/routes/recipes/_recipeLayout.svelte'
      },
	  remarkPlugins: [
		mdsvexRelativeImages    // rewrites image links to imported assets :contentReference[oaicite:1]{index=1}
	  ]
    })
  ],

  kit: {
    adapter: adapter({ precompress: true }),                // gzip/Brotli if desired :contentReference[oaicite:6]{index=6}
    // prerender: { default: true }                            // prerender all routes by default :contentReference[oaicite:7]{index=7}
  }
};

export default config;
