<script lang="ts">
	import '../app.postcss';

	let days: number[] = []
		for (let i = 1; i < 27; i++) {
			days.push(i)
		}

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<nav class="px-4 py-2 gap-2 flex">
	{#each days as day}
		<a href="/day{day}">{day}</a>
	{/each}
</nav>

<slot />
