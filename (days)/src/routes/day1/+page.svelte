<script lang="ts">
	import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table'
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table'
	import { writable } from 'svelte/store'

	export let data

	const niceChildren: Child[] = [...data.children.filter((child: Child) => child.tally >= 0).reverse()]
	const naughtyChildren: Child[] = [...data.children.filter((child: Child) => child.tally < 0)]

	const defaultColumns: ColumnDef<Child>[] = [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'tally',
			header: 'Tally',
			cell: (info) => info.getValue()
		}
	]
	
	const optionsNice = writable<TableOptions<Child>>({
		data: niceChildren,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	})

	const optionsNaughty = writable<TableOptions<Child>>({
		data: naughtyChildren,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	})
	const niceTable = createSvelteTable(optionsNice)
	const naughtyTable = createSvelteTable(optionsNaughty)
</script>

<div class="flex gap-20 justify-center mt-[20vh]">
	<table>
		<caption>Naughty List</caption>
		<thead>
			{#each $naughtyTable.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colSpan={header.colSpan} class="border-2 p-3">
						{#if !header.isPlaceholder}
							<svelte:component this={flexRender(header.column.columnDef.header, header.getContext())} />
						{/if}
					</th>
				{/each}
			</tr>
			{/each}
		</thead>

		<tbody>
			{#each $naughtyTable.getRowModel().rows as row}
				<tr>
					{#each row.getVisibleCells() as cell}
						<td class="border-2 p-3">
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<table>
		<caption>Nice List</caption>
		<thead>
			{#each $niceTable.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colSpan={header.colSpan} class="border-2 p-3">
						{#if !header.isPlaceholder}
							<svelte:component this={flexRender(header.column.columnDef.header, header.getContext())} />
						{/if}
					</th>
				{/each}
			</tr>
			{/each}
		</thead>

		<tbody>
			{#each $niceTable.getRowModel().rows as row}
				<tr>
					{#each row.getVisibleCells() as cell}
						<td class="border-2 p-3">
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>


