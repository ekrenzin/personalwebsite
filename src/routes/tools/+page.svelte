<script>
	const tools = [
		{
			name: 'Figma',
			description: 'Design and prototyping tool',
			url: 'https://www.figma.com',
			image:
				'https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png'
		},
		{
			name: 'Miro',
			description: 'Online collaborative whiteboard',
			url: 'https://miro.com',
			image: '/assets/brands/miro.png'
		},
		{
			name: 'Notion',
			description: 'All-in-one workspace',
			url: 'https://www.notion.so',
			image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png'
		},
		{
			name: 'Azure DevOps',
			description: 'Development collaboration tools',
			url: 'https://azure.microsoft.com/en-us/services/devops/',
			image: 'https://azure.microsoft.com/svghandler/devops/?width=600&height=315'
		},
		{
			name: 'SharePoint',
			description: 'Document management and collaboration',
			url: 'https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/e/e1/Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg'
		},
		{
			name: 'ChatGPT',
			description: 'AI language model by OpenAI',
			url: 'https://chat.openai.com',
			image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
		},
		{
			name: 'GitHub',
			description: 'Code hosting and collaboration',
			url: 'https://github.com',
			image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
		},
		{
			name: 'Markdown Space',
			description: 'Markdown editor',
			url: 'https://markdownspace.com',
			image:
				'https://files.markdown.space/9836cef3-b4a8-4a8c-bf9f-7412f0042573/markdown-space-white-logo.svg'
		},
		{
			name: 'Obsidian',
			description: 'Personal knowledge management',
			url: 'https://obsidian.md',
			image: 'https://obsidian.md/favicon.ico'
		}
	];
</script>

<div class="min-h-screen text-white">
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-4xl font-bold mb-8 text-center">Tools</h1>
		<p class="text-center text-xl">
			These are the tools I use for product management and software engineering. This page is for my
			own reference.
		</p>
		<hr class="my-4" />

		<div class="tool-grid">
			{#each tools as tool}
				<a href={tool.url} class="tool-card">
					<div class="tool-top">
						<img src={tool.image} alt={tool.name} class="tool-image" />
					</div>
					<div class="tool-bottom">
						<h2 class="tool-name">{tool.name}</h2>
						<p class="tool-description">{tool.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.tool-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 2rem;
	}

	.tool-card {
		display: flex;
		flex-direction: column;
		background-color: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: 0.3s ease;
	}

	.tool-card:hover {
		box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
	}

	.tool-top {
		height: 150px;
		overflow: hidden;
		background: linear-gradient(to right, rgba(100, 200, 255, 0.25), rgba(0, 0, 255, 0.1));
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		padding: 1rem;
	}

	.tool-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.tool-bottom {
		padding: 1rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.tool-name {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #ffffff;
		transition: color 0.3s ease;
	}

	.tool-card:hover .tool-name {
		transform: translateY(-2px);
	}

	.tool-description {
		color: #e2e8f0; /* Light gray color */
		flex-grow: 1;
	}
</style>
