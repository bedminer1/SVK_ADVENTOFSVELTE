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

<slot />
