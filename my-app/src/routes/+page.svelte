<script>
    import { onMount } from "svelte";

    let children = null
    let naughtiestChild = null
    let nicestChild = null

    async function fetchData() {
        try {
            const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            children = await response.json()
        }   catch (error) {
            console.error('Fetch error:', error)
        }
    }

    $: if (children) {
        children.sort((a,b) => b.tally - a.tally)

        if (children.length > 0) {
            nicestChild = children[0]
            naughtiestChild = children[children.length - 1]
        }
    }

    onMount(() => {
        fetchData()
    })
</script>

<div class="flex flex-col justify-top items-center w-screen">
<h1 class="text-4xl py-11">Naughty or Nice</h1>
<p>The nicest kid was {nicestChild?.name} with a niceness score of {nicestChild?.tally} <br> The naughtiest kid was {naughtiestChild?.name} with a niceness score of {naughtiestChild?.tally} </p>
{#if children}
<table class="w-1/6">
    {#each children as child, index}
    <tr class="border-b-2">
        <td>
            {index + 1}
        </td>
        <td>
            {child.name}
        </td>
        <td>
            {child.tally}
        </td>
    </tr>
    {/each}
</table>
{:else}
    <p>Loading...</p>
{/if}
</div>
