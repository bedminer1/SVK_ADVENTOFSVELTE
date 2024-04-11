<script lang="ts">
    import { ListBox, ListBoxItem, ProgressBar, Table, tableMapperValues } from '@skeletonlabs/skeleton'
    import type { TableSource } from '@skeletonlabs/skeleton'

    export let data
    let children: Present[] = data.children

    function setTableSource(): TableSource {
        return {
            head: ['Name', 'Weight','Selected'],
            body: tableMapperValues(children, ['name', 'weight', 'added']),
        }
    }

    $: tableSimple = children ? setTableSource() : {head: [], body: []}

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
    $: isOver = sumWeight > 100
    
</script>

<div class="w-full flex flex-col items-center gap-10">
    {#if isOver}
        <h1 class="text-center text-red-400 h1">
            Sum: {sumWeight.toFixed(2)} 
        </h1>
    {:else}
        <div>
            <h1 class="text-center h1">
                Sum: {sumWeight.toFixed(2)}
            </h1>
            <ProgressBar value={sumWeight} max={100} />
        </div>
    {/if}
    
    <div class="w-1/2">
        <Table 
            source={tableSimple} 
            interactive={true} 
            on:selected={handleSelect} 
            />
    </div>
</div>