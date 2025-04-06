<script>
	import { page } from '$app/stores';
</script>

<header>
	<div class="site-name">Krystian Moras</div>
	<nav>
		<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
		<a href="/blog" class:active={$page.url.pathname === '/blog'}>Blog</a>
		<a href="/garden" class:active={$page.url.pathname === '/garden'}>My Digital Garden</a>
		<a href="/recipes" class:active={$page.url.pathname === '/recipes'}>Recipes</a>
	</nav>
</header>

<style>
:global(body) {
	font-family: system-ui, sans-serif;
	background-color: #fefcf6;
	color: #2e2e2e;
	margin: 0;
	padding: 0;
	line-height: 1.6;
}

header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 1rem;
	max-width: 720px;
	margin: 0 auto;
	font-size: 1rem;
}

.site-name {
	font-weight: 600;
}

nav a {
	margin-left: 1.5rem;
	text-decoration: none;
	color: inherit;
	position: relative;
}

nav a.active::after {
	content: '';
	position: absolute;
	bottom: -2px;
	left: 0;
	width: 100%;
	height: 1px;
	background: #222;
}

</style>
