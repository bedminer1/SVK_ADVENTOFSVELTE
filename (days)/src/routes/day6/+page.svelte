<script lang="ts">
    import { onMount } from 'svelte'

    let counter = 0
    let resetBtn: HTMLButtonElement

    
    let date = new Date()
    
    onMount(() => setInterval(() => {
        date = new Date()
    }, 1000))
    
    let startingTime = timeToSeconds(date.toLocaleTimeString())
    $: time = date.toLocaleTimeString()
    
    function timeToSeconds(time: string): number {
        const timeArr = time.split(':')
        let output: number = 0
        output += Number(timeArr[1]) * 60
        output += Number(timeArr[2])
        output += Number(timeArr[0]) * 60 * 60
        return output
    }
    
    $: currSeconds = timeToSeconds(time)
    $: timePassed = currSeconds - startingTime
    $: increment = () => {
        counter++
    }

    $: reset = () => {
        counter = 0
        startingTime = timeToSeconds(date.toLocaleTimeString())
        setTimeout(() => {
            resetBtn.blur()
        }, 200);
    }
</script>

{#if counter > 0}
    {(counter / (timePassed / 60)).toFixed(1)}
{/if}
<svelte:window on:keydown={increment} />
<p>tap any key to record beat</p>
<button class="btn" on:click={reset} bind:this={resetBtn}>click when song over</button>

