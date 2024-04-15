<script lang="ts">
    import { Accordion, AccordionItem, Paginator, Table } from '@skeletonlabs/skeleton';
    import type { PaginationSettings } from '@skeletonlabs/skeleton';

    export let data
    
    let count = 0
    let allBags: PresentGroup[] = []
    let bag: Present[] = []
    let tableSource: Present[] = data.presents

// GROUPING DATA
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
    
    // PAGINATION 
        let displayedIndex = 1
        let displayIndexInput: number = displayedIndex
        $: displayedBag = allBags[displayedIndex - 1]
        
        const incrementDisplayIndex = () => {
            displayedIndex++
            displayIndexInput = displayedIndex
            scrollToBottom()
        }
        const decrementDisplayIndex = () => {
            displayedIndex--
            displayIndexInput = displayedIndex
            scrollToBottom()
        }
        const setStartDisplayIndex = () => {
            displayedIndex = 1
            displayIndexInput = displayedIndex
            scrollToBottom()
        }
        const setEndDisplayIndex = () => {
            displayedIndex = allBags.length
            displayIndexInput = displayedIndex
            scrollToBottom()
        }

        function handleSubmit() {
            displayedIndex = displayIndexInput
            scrollToBottom()
        }

// SCROLL
        function scrollToBottom() {
            setTimeout(() => {
                window.scrollTo(0, 1200)
            }, 200)
        }
</script>

<div class="flex flex-col items-center w-full">
    <h1 class="h1 text-center mt-10 mb-2">Sleigh Load Balancer 2.0</h1>
    <p class="p mb-10">Automatically sorted for your convenience :-&#41</p>
    <div class="w-1/2">
        <table class="table">
            <thead>
                <th>Index</th>
                <th>Name</th>
                <th>Present Weight</th>
            </thead>
            <tbody>
                {#each displayedBag.presents as present, index}
                <tr>
                        <td>{index + 1}</td>
                        <td>{present.name}</td>
                        <td>{present.weight.toFixed(2)}</td>
                    </tr>
                {/each}
            </tbody>
            <tfoot>
                <td>Bag ID: {displayedIndex}</td>
                <td>Number of Children: {displayedBag.presents.length}</td>
                <td>Total Weight: {displayedBag.weight.toFixed(2)}</td>
            </tfoot>
        </table>



        <div class="flex gap-3 py-3 w-full justify-center">
            <button on:click={setStartDisplayIndex}>&#8592</button>
            <button on:click={decrementDisplayIndex}>&#8592</button>
            <form on:submit={handleSubmit} class="w-20">
                <input type="text" bind:value={displayIndexInput} class="input pl-5">
            </form>
    
            <button on:click={incrementDisplayIndex}>&#8594;</button>
            <button on:click={setEndDisplayIndex}>&#8594;</button>
        </div>
    </div>
</div>