<script lang="ts">
    import { Paginator, ProgressBar } from '@skeletonlabs/skeleton'
    import type { PaginationSettings } from '@skeletonlabs/skeleton'

    let total = 0
    let waterToAdd: string
    const TARGET = 2000

    let inputs: WaterInput[] = []

    async function handleSubmit() {
        const waterAmount = Number(waterToAdd)
        if (isNaN(waterAmount)) {
            waterToAdd = ""
            return
        }
        const dateTime = new Date().toLocaleString()
        const newInput: WaterInput = {
            timestamp: dateTime,
            amount: waterAmount,
        }

        inputs = [...inputs, newInput]
        total += waterAmount
        waterToAdd = ""
    }

    let paginationSettings = {
        page: 0,
        limit: 10,
        size: inputs.length,
        amounts: [3, 5, 10, 15]
    } satisfies PaginationSettings

    $: paginatedSource = inputs.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    );

    // TODO
    /*
     - previous inputs tracker
     - loading bar
     - adjustable target
     - streaks
    */
</script>

<div class="flex flex-col h-[90vh] items-center">
    <form on:submit={handleSubmit}>
        <span class="h3">Amount to be added (ml): </span>
        <input type="text" class="input mt-2 rounded-lg" bind:value={waterToAdd} placeholder="eg. 500"> 
        <button></button>
    </form>

    <ProgressBar 
        value={total} 
        max={2000} 
        height={"h-5"}
        meter={total > 200 ? 'bg-[#DCC7EA]' : 'bg-white'}
        class="mb-5"
    />

    <div class="w-full border-dashed border-2 rounded-lg flex flex-col p-3 mb-5">
        <p class="h3 mb-4">Total Amount Drank: {total} ml</p>
        <p class="h3 mb-2">Amount to Target: {TARGET - total > 0 ? TARGET - total : 0} ml</p>
    </div>
    <button class="text-xl btn variant-ghost-primary mb-10" on:click={() => total = 0}>Reset</button>

    {#if total >= TARGET}
        <p class="h3 text-center">TARGET HIT, NICE ONE!</p>
    {/if}

    {#if inputs.length} 
    <table class="table mb-3">
        <thead>
            <tr>
                <th>Time Stamp</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {#each paginatedSource as input}
                <tr>
                    <td>{input.timestamp}</td>
                    <td>{input.amount}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <Paginator bind:settings={paginationSettings}/>
    {/if}
</div>




