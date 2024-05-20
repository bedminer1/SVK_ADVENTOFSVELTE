<script lang="ts">
  import type { Water } from "three/examples/jsm/Addons.js";

    let total = 0
    let waterToAdd: string
    const TARGET = 2000

    let inputs: WaterInput[] = []

    async function handleSubmit() {
        const waterAmount = Number(waterToAdd)
        const dateTime = new Date().toLocaleString()
        const newInput: WaterInput = {
            timestamp: dateTime,
            amount: waterAmount,
        }

        inputs = [...inputs, newInput]
        total += waterAmount
        waterToAdd = ""
    }

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

    <div class="w-full border-dashed border-2 rounded-lg flex flex-col p-3 mb-5">
        <p class="h3 mb-4">Total Amount Drank: {total} ml</p>
        <p class="h3 mb-2">Amount to Target: {TARGET - total > 0 ? TARGET - total : 0} ml</p>
    </div>
    <button class="text-xl btn variant-ghost-primary mb-10" on:click={() => total = 0}>Reset</button>


    {#if total >= TARGET}
        <p class="h3 text-center">TARGET HIT, NICE ONE!</p>
    {/if}

    <div>
        {#each inputs as input}
            <p>{input.timestamp}</p>
            <p>{input.amount}ml</p>
        {/each}
    </div>
</div>




