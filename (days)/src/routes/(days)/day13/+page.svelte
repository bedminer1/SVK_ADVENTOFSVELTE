<script lang="ts">
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    export let data
    let count = 0

    let allBags: PresentGroup[] = []
    let bag: Present[] = []

    for (let present of data.presents) {
        // add present to bag
        if (count + present.weight < 100) {
            bag = [...bag, present]
            count += present.weight
        } else {
            // bag is full, add clone of bag to bagbag and reset bag
            allBags = [...allBags, {presents: bag, weight: count}]
            bag = []
            count = 0
        }
    }
</script>

<div class="flex flex-col items-center w-full">
    <h1 class="h1 text-center mt-10 mb-2">Sleigh Load Balancer 2.0</h1>
    <p class="p mb-10">Automatically sorted for your convenience :-&#41</p>
    <div class="w-1/2">
        <Accordion>
            {#each allBags as presentGroup, index}
            <AccordionItem>
                <svelte:fragment slot="lead">Bag ID: {index + 1}</svelte:fragment>
                <svelte:fragment slot="summary">
                    Number of Children: {presentGroup.presents.length} | Weight: {presentGroup.weight.toFixed(2)}kg
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="grid grid-cols-3 gap-4">
                        {#each presentGroup.presents as present, index}
                            <p class="rounded-lg bg-green-800 p-3 hover:bg-green-900">{index + 1}. Name: {present.name} | Present Weight: {present.weight}kg</p>
                        {/each}
                    </div>
                    
                </svelte:fragment>
            </AccordionItem>
            {/each}
        </Accordion>
    </div>
</div>