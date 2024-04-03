<script lang="ts">
    import { T } from '@threlte/core';
	import { Grid, OrbitControls, Text } from '@threlte/extras';
	import Present from './Present.svelte';
    // @ts-ignore
	import { scaleLinear } from 'd3-scale';
    // @ts-ignore
	import { extent } from 'd3-array';

    export let presents3D: Present3D[]

    $: xScale = scaleLinear().domain([1, 20]).range([-1, 1])
    $: yScale = scaleLinear().domain([1, 20]).range([-1, 1])

    $: zScale = scaleLinear().domain(extent(presents3D.map((p) => p.z))).range([0, 0.65])
</script>

{#each presents3D as p}
    <Present 
        name={p.name}
        pos={`${p.x},${p.y},${p.z}`}
        x={xScale(p.x)}
        y={yScale(p.y)}
        z={zScale(p.z)}
    />
    
{/each}