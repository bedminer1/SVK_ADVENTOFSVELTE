<script lang="ts">
    import { Paginator, ProgressBar, Table, tableMapperValues } from '@skeletonlabs/skeleton'
    import type { TableSource, PaginationSettings } from '@skeletonlabs/skeleton'

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

// UPDATE SELECTED OR NOT
    function handleSelect(e: any) {
        const isAdded: boolean = e.detail[2]

        if (!isAdded) 
            selectedGroup.add(JSON.stringify(e.detail.slice(0, 2)))
        else 
            selectedGroup.delete(JSON.stringify(e.detail.slice(0, 2)))

        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            if (child.name === e.detail[0]) {
                children[i].added = !isAdded
                children = children
            }
        }

        sumWeight = [...selectedGroup].reduce((accm, curr) => accm + Number(curr.split(',')[1].slice(-6, -2)), 0)
    }

    let selectedGroup = new Set<string>()
    let sumWeight: number = 0
    
</script>

<div class="w-full flex flex-col items-center gap-10">
    <h1 class="h1 my-10">Sleigh Load Balancer™</h1>

    <div class="w-1/3 flex flex-col gap-2">
        <h1 class="text-center h3">
            Total Weight: {sumWeight.toFixed(2)} / 100
        </h1>
        <ProgressBar 
            value={sumWeight} 
            max={100} 
            height={"h-3"}
            meter={'variant-filled-success'}
            />
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