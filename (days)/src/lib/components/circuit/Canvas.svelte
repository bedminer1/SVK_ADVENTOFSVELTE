<script lang="ts">
    import { Canvas } from '@threlte/core'
    import Scene from './Scene.svelte'

    export let intensity
  </script>


<main class="relative my-10 w-full h-[400px] md:h-[700px] border-2 drop-shadow-xl border-dashed rounded-xl">
    <Canvas>
        <Scene {intensity}/>
    </Canvas>
</main>