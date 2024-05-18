<script lang="ts">
    let total = 0
    let waterToAdd: string
    const TARGET = 2000

    function handleSubmit() {
        total += Number(waterToAdd)
        waterToAdd = ""
    }
</script>

<div class="flex flex-col h-[90vh] justify-center items-center">
    <form on:submit={handleSubmit}>
        <span class="h3">Amount to be added (ml): </span>
        <input type="text" class="input" bind:value={waterToAdd} placeholder="eg. 500"> 
        <button></button>
    </form>
    <p class="h3 w-full mb-8">Total Amount Drank: {total} ml</p>
    <p class="h3 w-full mb-8">Amount to Target: {TARGET - total} ml</p>
    <button class="text-xl btn variant-ghost-primary mb-10" on:click={() => total = 0}>Reset</button>

    {#if total >= TARGET}
        <p class="h3 text-center">TARGET HIT, NICE ONE!</p>
    {/if}
</div>



