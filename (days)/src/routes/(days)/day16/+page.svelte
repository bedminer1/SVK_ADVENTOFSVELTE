<script lang="ts">
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'

    export let data

</script>

<div>
    <Accordion>
        {#each data.grid as row, rowIndex}
        <AccordionItem>
            <svelte:fragment slot="summary"> <h1>x: {rowIndex}</h1></svelte:fragment>
            <svelte:fragment slot="content">
            {#each row as cell, colIndex}
        <AccordionItem>
            <svelte:fragment slot="summary"> <h1>Present Count: {cell.length} | x: {rowIndex} | y: {colIndex}</h1></svelte:fragment>
            <svelte:fragment slot="content">
                {#each cell as present}
                <div class="card p-3">
                    <p>Present for: {present.name}</p>
                </div>
                {/each}
            </svelte:fragment>
           
            
        </AccordionItem>
        {/each}      
        </svelte:fragment>
        </AccordionItem>
  
        {/each}
    </Accordion>
</div>
