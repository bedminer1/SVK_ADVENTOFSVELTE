<script lang="ts">
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'
    export let data

    let valueMultiple: string[] = []
    $: sumWeight = valueMultiple.reduce((accm, curr) => accm + Number(curr[1]), 0)
    $: isOver = sumWeight > 100
    
</script>

{#if isOver}
    <h1 class="text-center text-red-400 h1">
        Sum: {sumWeight.toFixed(2)} 
    </h1>
{:else}
    <h1 class="text-center h1">
        Sum: {sumWeight.toFixed(2)}
    </h1>
{/if}

<div class="flex">
    <div class="w-1/2 flex flex-col">
        <h2 class="h2">Selected Children</h2>
        {#each valueMultiple as selected}
            <p>{selected[0]}</p>       
        {/each}
    </div>
    
    <div class="w-1/2 h-[50vh] overflow-scroll">
        <ListBox multiple>
        {#each data.children as child}
            <ListBoxItem bind:group={valueMultiple} name="options" value={[child.name, parseFloat(child.weight)]}>
                {child.name} | {child.weight}
            </ListBoxItem>
        {/each}
        </ListBox>
    </div>
    
</div>