<script>
	export let data

	const niceChildren = [...data.children.filter((child) => child.tally >= 0).reverse()]
	const naughtyChildren = [...data.children.filter((child) => child.tally < 0)]
</script>

<div class="flex gap-10">
	<ul>
		{#each naughtyChildren as child, index}
			<li>{index + 1} {child.name} | {child.tally}</li>
		{/each}
	</ul>
	<ul>
		{#each niceChildren as child, index}
			<li>{index + 1} {child.name} | {child.tally}</li>
		{/each}
	</ul>
</div>


