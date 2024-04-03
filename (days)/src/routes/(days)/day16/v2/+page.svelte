<script lang="ts">
    import Canvas from "$lib/components/Canvas.svelte";
    import { search } from '$lib/stores'
    import Select from 'svelte-select'
    
    export let data

    const presents3D: Present3D[] = data.presents3D
</script>

<div class="w-2/3">
    <h1 class="h1 text-center">Present Warehouse</h1>
    <Canvas {presents3D}/>

    <Select
        class="selected"
        placeholder="Search for a kid's present"
        bind:value={$search}
        items={presents3D.map((p) => p.name)}
        --placeholder-color="#B2CCD6"
        --list-background="#2a303c"
        --background="#2a303c"
        --item-hover-bg="#20252E"
        --selected-item-background="#B2CCD6"
        --item-is-active-bg="#B2CCD6"
        --item-is-active-color="#2A303C"
    />
</div>

