<script lang="ts">
    import { Paginator, ProgressBar, Table, tableMapperValues } from '@skeletonlabs/skeleton'
    import type { TableSource, PaginationSettings } from '@skeletonlabs/skeleton'
  import { select } from 'd3';

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

// REMOVE ALL
    function removeAllSelected() {
        for (const present of tableMapperValues(children, ['name', 'weight', 'added'])) {
            if (present[2] === true) {
                const event = {detail: present}
                handleSelect(event)
            }
        }
    }

// REMOVE ALL IN PAGE
    function removeAllInPage() {
        for (const present of tableMapperValues(paginatedSource, ['name', 'weight', 'added'])) {
            if (present[2] === true) {
                const event = {detail: present}
                handleSelect(event)
            }
        }
    }

// ADD ALL IN PAGE
    function addAllInPage() {
        for (const present of tableMapperValues(paginatedSource, ['name', 'weight', 'added'])) {
            if (present[2] === false) {
                const event = {detail: present}
                handleSelect(event)
            }
        }
    }

// UPDATE SELECTED OR NOT
    function handleSelect(e: any) {
        const isAdded: boolean = e.detail[2]

        if (!isAdded) {
            if (sumWeight > 100) {
                return
                }
            selectedGroup.add(JSON.stringify(e.detail.slice(0, 2)))
        }
        
        else 
            selectedGroup.delete(JSON.stringify(e.detail.slice(0, 2)))

        selectedGroup = selectedGroup

        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            if (child.name === e.detail[0]) {
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
        <Table 
            source={tableSimple} 
            interactive={true} 
            on:selected={handleSelect} 
            />

        <Paginator 
            bind:settings={paginationSettings}
        />
    </div>
</div>