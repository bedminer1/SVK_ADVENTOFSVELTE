<script lang="ts">
    import Canvas from '$lib/components/circuit/Canvas.svelte'
    import { RangeSlider } from '@skeletonlabs/skeleton'

    let intensity = 0
</script>

<div class="flex flex-col w-full h-[90vh] items-center justify-center">
    <div class="w-2/3">
        <h1 class="h1 text-center">Light Bulb Demo</h1>
        <Canvas {intensity}/>
        <RangeSlider name="range-slider" bind:value={intensity} max={20} step={0.01} ticked></RangeSlider>
    
    </div>
</div>