<script lang="ts">
	import '../app.postcss';

	let days: number[] = []
		for (let i = 1; i < 27; i++) {
			days.push(i)
		}

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Snowfall from "$lib/components/snowfall.svelte";



	const defaults = {
		gravity: 100,
		gravityVariance: 10,
		drift: 0,
		driftVariance: 50,
		rate: 2,
		size: 2,
	}

	let settings = {...defaults}
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Snowfall 
    {...settings}
/>
<slot />
