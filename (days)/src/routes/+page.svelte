<script lang="ts">
    let days: number[] = []
    for (let i = 1; i < 27; i++) {
        days.push(i)
    }
</script>

<div class="flex flex-col items-center justify-center gap-2 h-screen">
    {#each days as day}
    <a href="/day{day}">Day {day}</a>
    {/each}
</div>