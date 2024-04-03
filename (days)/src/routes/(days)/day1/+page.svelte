<script lang="ts">
	import { createSvelteTable, flexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/svelte-table'
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table'
	import { writable } from 'svelte/store'

	export let data

	const niceChildren: Child[] = [...data.children.filter((child: Child) => child.tally >= 0).reverse()]
	const naughtyChildren: Child[] = [...data.children.filter((child: Child) => child.tally < 0)]

	const defaultColumns: ColumnDef<Child>[] = [
		{
			accessorKey: 'index',
			header: 'Ranking',
			size: 20,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'name',
			header: 'Name',
			size: 50,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'tally',
			header: 'Score',
			cell: (info) => info.getValue(),
			size: 20,
		}
	]
	
	const optionsDefault = writable<TableOptions<Child>>({
		data: [...data.children].reverse(),
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			pagination: {
				pageIndex: 0,
				pageSize: 10,
			},
		},
	})

	const optionsNice = writable<TableOptions<Child>>({
		data: niceChildren,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	const optionsNaughty = writable<TableOptions<Child>>({
		data: naughtyChildren,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	const table = createSvelteTable(optionsDefault)
	const niceTable = createSvelteTable(optionsNice)
	const naughtyTable = createSvelteTable(optionsNaughty)

	let show = 'all'

	function setCurrentPage(page: number) {
		optionsDefault.update((old: any) => {
			return {
				...old,
				state: {
					...old.state,
					pagination: {
						...old.state?.pagination,
						pageIndex: page
					}
				}
			}
		})
	}
</script>

<div class="flex flex-col items-center gap-5 w-full">
	<h1 class="h1">Naughty or Nice</h1>
	<select class="select w-1/2" bind:value={show}>
		<option value="all">Show All</option>
		<option value="naughty">Naughty List</option>
		<option value="nice">Nice List</option>
	</select>
	<div class="flex gap-0 justify-center w-full">
		{#if show === "all"}
		<div class="flex gap-0 items-center flex-col w-full">
			<div>
				<button on:click={() => setCurrentPage($table.getState().pagination.pageIndex - 1)} disabled={!$table.getCanPreviousPage()} class="btn"> &lt </button>
				<span>{$table.getState().pagination.pageIndex + 1}</span>
				<button on:click={() => setCurrentPage($table.getState().pagination.pageIndex + 1)} disabled={!$table.getCanNextPage()} class="btn"> &gt </button>
			</div>

		<table class="table mr-0 w-1/3 h-screen overflow-scroll">
			<thead>
				{#each $table.getHeaderGroups() as headerGroup}
	
				<tr>
					{#each headerGroup.headers as header}
						<th colSpan={header.colSpan} class="border-2 p-3 w-{header.column.columnDef.size}">
							{#if !header.isPlaceholder}
								<svelte:component this={flexRender(header.column.columnDef.header, header.getContext())} />
							{/if}
						</th>
					{/each}
				</tr>
				{/each}
			</thead>
	
			<tbody>
				{#each $table.getRowModel().rows as row}
					<tr class="hover:bg-primary-500">
						{#each row.getVisibleCells() as cell}
							<td class="border-2 p-2 hover:bg-primary-500">
								<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{:else if show === "naughty"}
		<table class="table w-2/3 mr-0 h-screen overflow-scroll">
			<thead>
				{#each $naughtyTable.getHeaderGroups() as headerGroup}
	
				<tr>
					<th class="border-2">Placing</th>
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
				{#each $naughtyTable.getRowModel().rows as row, index}
					<tr>
						<td class="border-2">{index + 1}</td>
						
						{#each row.getVisibleCells() as cell}
							<td class="border-2 p-3 hover:bg-primary-500">
								<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	
	{:else if show === "nice"}
	<table class="table w-2/3 ml-0 h-screen overflow-scroll">
		<thead>
			{#each $niceTable.getHeaderGroups() as headerGroup}
			<tr>
				<th class="border-2">Placing</th>
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
			{#each $niceTable.getRowModel().rows as row, index}
				<tr>
					<td class="border-2 w-32">{index + 1}</td>
					{#each row.getVisibleCells() as cell}
						<td class="border-2 p-3 hover:bg-primary-500">
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	{/if}
	</div>	
</div>