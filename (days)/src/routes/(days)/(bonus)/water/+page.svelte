<script lang="ts">
    import { tick } from "svelte"

    let total = 0
    let waterToAdd: string
    let ref: HTMLInputElement
    const TARGET = 2000

    const focus = async () => {
		await tick()
		ref.focus()
        console.log("hi")
	}

    async function handleSubmit() {
        total += Number(waterToAdd)
        waterToAdd = ""
        
       focus()
        
    }

    // TODO
    /*
     - previous inputs tracker
     - loading bar
     - adjustable target
     - streaks
    */
</script>

<div class="flex flex-col h-[90vh] justify-center items-center">
    <form on:submit={handleSubmit}>
        <span class="h3">Amount to be added (ml): </span>
        <input type="text" class="input mt-2 rounded-lg" bind:value={waterToAdd} placeholder="eg. 500" bind:this={ref}> 
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
</div>




