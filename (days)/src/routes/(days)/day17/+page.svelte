<script lang="ts">
    import { enhance } from '$app/forms'
    import { giftStore } from '$lib/stores'

    let budget: number = 30

    let currGift: string
    let currAmount: number
    let gifts: Expense[] = []
    let overBudget = false

    function handleSubmit() {
        if (sum > budget) {
            overBudget = true
            return
        }
        giftStore.set([...$giftStore, ({
            gift: currGift,
            amount: currAmount,
        })])
    }

    function clear() {
        giftStore.set([])
    }

    $: sum = $giftStore.reduce((prev, curr) => prev + curr.amount, 0)
</script>

<div>
    <p>Your budget: ${budget}</p>

    <form on:submit={() => handleSubmit()}>
        <input type="text" bind:value={currGift} class="input">
        <input type="number" bind:value={currAmount} class="input">
        <button>submit</button>
    </form>
    <button on:click={() => clear()}>Clear</button>

    <p>Gifts: {JSON.stringify($giftStore)}</p>
    <p>Total: ${sum}</p>

    {#if overBudget}
        <p>OVER BUDGET!!</p>
    {/if}
</div>