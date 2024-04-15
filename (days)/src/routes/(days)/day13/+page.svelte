<script lang="ts">
    export let data
    
    let limit: number = 50
    let limitInput: number = limit
    let count = 0
    let allBags: PresentGroup[] = []
    let bag: Present[] = []
    

// UPDATE LIMIT
    function handleLimitChange() {
        allBags = []
        bag = []
        count = 0
        limit = limitInput
        scrollToBottom()
    }

// GROUPING DATA
    $: for (let present of data.presents) {
            // add present to bag
            if (count + present.weight < limit) {
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
            if (displayedIndex === allBags.length) return
            displayedIndex++
            displayIndexInput = displayedIndex
            scrollToBottom()
        }
        const decrementDisplayIndex = () => {
            if (displayedIndex === 1) return
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

        function handleManualPaginationUpdate() {
            displayedIndex = displayIndexInput
            scrollToBottom()
        }

// NAV SHORTCUT
        function handleKeydown(key: string) {
            if (key === 'q') {
                decrementDisplayIndex()
            }
            if (key === " ") {
                incrementDisplayIndex()
            }
        }

// SCROLL
        function scrollToBottom() {
            setTimeout(() => {
                window.scrollTo(0, 30000)
            }, 20)
        }
</script>

<div class="flex flex-col items-center w-full">
    <h1 class="h1 text-center mt-10 mb-2">Sleigh Load Balancer 2.0</h1>
    <p class="p mb-10">Automatically sorted for your convenience :-&#41</p>

    <div class="mb-7 text-xl flex flex-col gap-1">
        <p>Total Presents: 10000</p>
        <p>Number of Bags: {allBags.length}</p>
        <form on:submit={handleLimitChange}>
            <label class="label flex items-center">
                <span>Weight Limit: </span>
                <input type="numeric" bind:value={limitInput} class="bg-transparent border-dashed border-2 w-16 h-10 pl-3 rounded-lg mx-2 focus:outline-none focus:border-[#DCC7EA]">
                <span>kg</span>
            </label>
        </form>
    </div>

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
            <button 
                class="btn w-8 variant-ghost-primary rounded-lg" 
                on:click={setStartDisplayIndex} 
                disabled={displayedIndex == 1}>
                &#8592
            </button>
            <button 
                class="btn w-8 variant-ghost-primary rounded-lg" 
                on:click={decrementDisplayIndex} 
                disabled={displayedIndex == 1}>
                &#8592
            </button>
            <form on:submit={handleManualPaginationUpdate} class="w-20">
                <input type="text" bind:value={displayIndexInput} class="input pl-5">
            </form>
    
            <button 
                class="btn w-8 variant-ghost-primary rounded-lg" 
                on:click={incrementDisplayIndex} 
                disabled={displayedIndex == allBags.length}>
                &#8594;
            </button>
            <button 
                class="btn w-8 variant-ghost-primary rounded-lg" 
                on:click={setEndDisplayIndex} 
                disabled={displayedIndex == allBags.length}>
                &#8594;
            </button>
        </div>
        <p class="text-sm w-full text-center"><i>*press Q for prev <br> and spacebar for next</i></p>

    </div>
</div>

<svelte:window on:keypress={(event) => {
    handleKeydown(event.key)
}}/>     