<script lang="ts">
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'

    export let data

</script>

<div class="w-2/3">
    <h1 class="h1 text-center mb-10">
        Present Warehouse
    </h1>
    <Accordion width="w-full">
        {#each data.grid as row, rowIndex}
        <AccordionItem>
            <svelte:fragment slot="summary"> <h1>row: {rowIndex + 1}</h1></svelte:fragment>
            <svelte:fragment slot="content">
            {#each row as cell, colIndex}
            {#if cell.length > 0}
                
            <AccordionItem>
                <svelte:fragment slot="summary"> 
                    <h1>
                        Present Count: {cell.length} | row: {rowIndex + 1} | col: {colIndex + 1}
                    </h1>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    {#each cell as present}
                    <div class="card p-3">
                        <p>Present for: {present.name}</p>
                    </div>
                    {/each}
                </svelte:fragment>
               
                
            </AccordionItem>
            {/if}
        {/each}      
        </svelte:fragment>
        </AccordionItem>
  
        {/each}
    </Accordion>
</div>
