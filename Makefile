reset_recipes:
	rm -rf src/lib/recipes
	mkdir src/lib/recipes
	obsidian-export ~/Documents/Personal/Przepisy src/lib/recipes
	npm run generate:previews
	rsync -avz -e ssh src/lib/recipes/ user@HetznerServer:/data/coolify/applications/rosowsoo0oscksk0ssoksg48/data
	 
	