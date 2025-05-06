reset_recipes:
	rm -rf src/lib/recipes
	mkdir src/lib/recipes
	obsidian-export ~/Documents/Personal/Przepisy src/lib/recipes
	npm run generate:previews