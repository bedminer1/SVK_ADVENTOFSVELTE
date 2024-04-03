<script lang="ts">
    let days: number[] = []
    for (let i = 1; i < 27; i++) {
        days.push(i)
    }
</script>

<div class="grid grid-cols-3 items-center justify-center gap-2  overflow-auto mt-10">
    {#each days as day}
    <a href="/day{day}" class="text-center">Day {day}</a>
    {/each}
</div>