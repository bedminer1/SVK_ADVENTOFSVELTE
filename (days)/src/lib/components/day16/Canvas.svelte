<script lang="ts">
    import { Canvas } from "@threlte/core";
    import { searchData } from "$lib/stores";
    import Scene from '$lib/components/day16/Scene.svelte'

    export let presents3D: Present3D[]
    $: console.log($searchData)
</script>

<main class="relative my-10 w-full h-[400px] md:h-[700px] border-2 drop-shadow-xl border-dashed rounded-xl">
    <Canvas>
        <Scene {presents3D}/>
    </Canvas>
</main>