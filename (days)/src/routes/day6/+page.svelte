<script lang="ts">
    import { onMount } from 'svelte'

    let counter = 0
    let resetBtn: HTMLButtonElement

    

    
    
    let startingTime: number
    let currSeconds: number
    setInterval(() => {
        currSeconds = Date.now()
    }, 500)
    $: timePassed = (currSeconds - startingTime) / 1000

    $: increment = () => {
        if (!startingTime) startingTime = Date.now()
        counter++
    }

    $: reset = () => {
        counter = 0
        startingTime = Date.now()
        setTimeout(() => {
            resetBtn.blur()
        }, 200);
    }
</script>

{#if counter > 0 && !isNaN(timePassed)}
    BPM: {(counter / (timePassed / 60)).toFixed(1)}
{:else}
    <p>tap any key to start</p>
{/if}
<svelte:window on:keydown={increment} />
<button class="btn" on:click={reset} bind:this={resetBtn}>click when song over</button>

