<script lang="ts">
    let count = 0
    $: increment = () => {
        count++
    }
    $: decrement = () => {
        if (count > 0) count--
    }
    $: reset = () => {
        count = 0
    }

    function handleKeydown(key: string) {
        if (key === 'd') {
           increment()
        }
        else if (key === 'a') {
            decrement()
        }
    }
</script> 

<div class="flex flex-col justify-center items-center">
    <p>Press 'A' to take away cookies and 'D' to give cookies</p>
    <div>
        <button on:click={decrement}>-</button>
        {count}
        <button on:click={increment}>+</button>
    </div>
    <button on:click={reset}>reset</button>
</div>
<svelte:window on:keypress={(event) => {
    handleKeydown(event.key)
}}/>