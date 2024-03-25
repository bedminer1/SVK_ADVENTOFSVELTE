<script lang="ts">
    let counter = 0

    $: increment = () => {
        counter++
    }

    $: reset = () => {
        counter = 0
    }
</script>

<p>{counter}</p>
<svelte:window on:keydown={increment} />
<p>tap any key to record beat</p>
<button class="btn" on:click={reset}>click when song over</button>

