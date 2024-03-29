<script lang="ts">
    let count = 0
    $: increment = () => {
        count++
    }
    $: decrement = () => {
        count--
    }
    $: reset = () => {
        count = 0
    }
</script> 

<div>
    {count}
    <button on:click={increment}>add</button>
    <button on:click={decrement}>reduce</button>
    <button on:click={reset}>reset</button>
</div>