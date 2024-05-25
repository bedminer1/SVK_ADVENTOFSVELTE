<script lang="ts">
    import { Paginator, ProgressBar } from '@skeletonlabs/skeleton'
    import type { PaginationSettings } from '@skeletonlabs/skeleton'

    let currAmount = 0
    let waterToAdd: string
    let target = 6000


    let inputs: WaterInput[] = []
    let amountMap = new Map<number, number>()

    // <DUMMY DATA
    const dummyDate = new Date()
    const dummyDate2 = new Date()
    dummyDate.setDate(dummyDate.getDate() - 1)
    dummyDate2.setDate(dummyDate2.getDate() - 2)
    const dummyInput: WaterInput = {
        amount: 500,
        timestamp: dummyDate
    }
    const dummyInput2: WaterInput = {
        amount: 1500,
        timestamp: dummyDate2
    }
    inputs = [dummyInput2, dummyInput]
    // DUMMY DATE>

    function handleSubmit() {
        const waterAmount = Number(waterToAdd)
        if (isNaN(waterAmount)) {
            waterToAdd = ""
            return
        }
        const dateTime = new Date()
        const newInput: WaterInput = {
            timestamp: dateTime,
            amount: waterAmount,
        }

        inputs = [...inputs, newInput]
        waterToAdd = ""
    }

    function handleReset() {
        const currDay = dayOfYear(new Date())
        for (let i = inputs.length - 1; i >= 0; i--) {
            let input = inputs[i]
            if (dayOfYear(input.timestamp) === currDay) {
                inputs = inputs.slice(0, i)
            }
        }
    }

    // <PAGINATION
    let paginationSettings = {
        page: 0,
        limit: 5,
        size: inputs.length,
        amounts: [3, 5, 10, 15]
    } satisfies PaginationSettings

    $: paginationSettings.size = inputs.length

    $: paginatedSource = inputs.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    );
    // PAGINATION>

    let streakMap = new Map<number, number>()

    const dayOfYear = (date: Date)=>
    //@ts-ignore
        Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    $: {
        amountMap = new Map()
        for (const input of inputs) {
        // parse timestamp into day index
        const day = dayOfYear(input.timestamp)
        if (!streakMap.has(day - 1)) {
            streakMap.set(day, 1)
        } else {
            streakMap.set(day, streakMap.get(day - 1)! + 1)
        }

        amountMap.set(day, (amountMap.get(day) ?? 0) + input.amount)
        currAmount = amountMap.get(dayOfYear(new Date)) ?? 0
    }}
</script>


<div class="flex flex-col h-[90vh] items-center">
    <form on:submit={handleSubmit}>
        <span class="h3">Amount to be added (ml): </span>
        <input type="text" class="input mt-2 rounded-lg" bind:value={waterToAdd} placeholder="eg. 500"> 
        <button></button>
    </form>

    <ProgressBar 
        value={currAmount < target ? currAmount : target} 
        max={target} 
        meter={currAmount > target ? 'bg-[#DCC7EA]' : 'bg-white'}
        height={"min-h-5"}
        class="mb-5"
    />

    <div class="w-full border-dashed border-2 rounded-lg flex flex-col p-3 mb-5">
        
        <p class="h3 mb-2 flex">Target Amount: <input type="text" bind:value={target} class="input w-20 rounded-lg mx-2 border-dashed border-2"> ml</p>
        <p class="h3 mb-2">Amount to Target: {target - currAmount > 0 ? target - currAmount : 0} ml</p>
        <p class="h3 mb-4">Total Amount Drank: {currAmount} ml</p>
        <p class="h3 mb-4">Streak: {streakMap.has(dayOfYear(dummyDate)) ? streakMap.get(dayOfYear(inputs[inputs.length - 1].timestamp)) : 0} day(s)</p>
    </div>
    <button class="text-xl btn variant-ghost-primary mb-10" on:click={handleReset}>Reset</button>

    {#if inputs.length} 
    <table class="table mb-3 text-center">
        <thead>
            <tr>
                <th class="text-center">ID</th>
                <th class="text-center">Amount</th>
                <th class="text-center">Time Stamp</th>
            </tr>
        </thead>
        <tbody>
            {#each paginatedSource as input, i}
                <tr>
                    <td>{i + 1}</td>
                    <td>{input.amount}</td>
                    <td>{input.timestamp.toLocaleString()}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <Paginator 
        bind:settings={paginationSettings}
        class="w-full flex justify-between"
    />
    {/if}
</div>




