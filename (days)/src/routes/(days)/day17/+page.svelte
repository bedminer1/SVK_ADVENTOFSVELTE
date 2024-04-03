<script lang="ts">
    import { enhance } from '$app/forms'
    import { giftStore } from '$lib/stores'

    let budget: number = 30

    let currGift: string
    let currAmount: number
    let overBudget = false
    let form: HTMLFormElement

    function handleSubmit() {
        if (sum + currAmount > budget) {
            overBudget = true
            setTimeout(() => {
                overBudget = false
                form.reset()
            }, 2000)
            return
        }
        form.reset()
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
    <p>Your budget:</p>
    <input type="number" class="input mb-10 w-20 rounded-md" bind:value={budget}>

    <form on:submit={() => handleSubmit()} bind:this={form}>
        <span>Gift:</span>
        <input type="text" bind:value={currGift} class="input">
        <span>Amount:</span>
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