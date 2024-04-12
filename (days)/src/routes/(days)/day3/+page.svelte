<script lang="ts">
  import BarChart from '$lib/components/BarChart.svelte';
    import { Paginator, ProgressBar, Table, tableMapperValues } from '@skeletonlabs/skeleton'
    import type { TableSource, PaginationSettings } from '@skeletonlabs/skeleton'
    import { DataHandler } from '@vincjo/datatables'

// DATA FROM LOAD
    export let data
    let children: Present[] = data.children

// PAGINATION
    let paginationSettings = {
        page: 0,
        limit: 10,
        size: children.length,
        amounts: [3, 5, 10, 15]
    } satisfies PaginationSettings

    $: paginationSettings.size = children.length

    $: paginatedSource = children.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    );

// TABLE
    function setTableSource(): TableSource {
        return {
            head: ['Name', 'Weight','Selected'],
            body: tableMapperValues(paginatedSource, ['name', 'weight', 'added']),
        }
    }

    $: tableSimple = children ? setTableSource() : {head: [], body: []}

// TABLE #2
    const handler = new DataHandler(children, { rowsPerPage: 10 })
    const rows = handler.getRows()

// REMOVE ALL
    function removeAllSelected() {
        for (const present of children) {
            if (present.added === true) {
                handleSelect(present)
            }
        }
    }

// REMOVE ALL IN PAGE
    function removeAllInPage() {
        for (const present of paginatedSource) {
            if (present.added === true) {
                handleSelect(present)
            }
        }
    }

// ADD ALL IN PAGE
    function addAllInPage() {
        for (const present of paginatedSource) {
            if (present.added === false) {
                handleSelect(present)
            }
        }
    }

// UPDATE SELECTED OR NOT
    function handleSelect(present: Present) {
        const isAdded: boolean = present.added

        if (!isAdded) {
            if (sumWeight > 100) {
                return
                }
            selectedGroup.add(JSON.stringify([present.name, present.weight]))
        }
        
        else 
            selectedGroup.delete(JSON.stringify([present.name, present.weight]))

        selectedGroup = selectedGroup

        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            if (child.name === present.name) {
                children[i].added = !isAdded
                children = children
            }
        }
    }


    let selectedGroup = new Set<string>()
    $: numberOfPresents = selectedGroup.size
    $: sumWeight = [...selectedGroup].reduce((accm, curr) => accm + Number(curr.split(',')[1].slice(-6, -2)), 0)

    
</script>

<div class="w-full flex flex-col items-center gap-10">
   <h1 class="h1 my-10">Sleigh Load Balancer™</h1>

    <div class="w-1/3 flex flex-col gap-4 items-center">
        <div>
            <h1 class="text-center h3">
                Total Weight: {sumWeight.toFixed(2)} / 100
            </h1>
            <h1 class="text-center h3">
                Number of Presents: {numberOfPresents}
            </h1>
        </div>
        <ProgressBar 
            value={sumWeight} 
            max={100} 
            height={"h-5"}
            meter={sumWeight > 100 ? 'bg-black' : 'bg-white'}
            />
            <div class="w-full flex justify-center gap-3">
                <button on:click={addAllInPage} class="btn rounded-md variant-ghost-primary w-1/3" disabled={(sumWeight > 100)}>add page</button>
                <button on:click={removeAllInPage} class="btn rounded-md variant-ghost-primary w-1/3" disabled={sumWeight === 0}>remove page</button>
                <button on:click={removeAllSelected} class="btn rounded-md variant-ghost-primary w-1/3" disabled={sumWeight === 0}>remove all</button>
            </div>
        
    </div>

    
    <div class="w-1/2 flex flex-col gap-2">
        <table class="table">
            <thead>
                <tr>
                    <th>Head</th>
                    <th>Weight</th>
                    <th>Selected</th>
                </tr>
            </thead>
            <tbody>
                {#each paginatedSource as present}
                    <tr on:click={() => handleSelect(present)} class:variant-ghost-secondary={present.added}>
                        <td>{present.name}</td>
                        <td>{present.weight}</td>
                        <td>{present.added}</td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <Paginator 
            bind:settings={paginationSettings}
        />
    </div>
</div>