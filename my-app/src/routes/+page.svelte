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

<div>
<h1>Naughty or Nice</h1>
{#if children}
<table>
    {#each children as child, index}
    <tr>
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