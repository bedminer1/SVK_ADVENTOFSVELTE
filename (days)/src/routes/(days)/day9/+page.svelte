<script lang="ts">
    let date = new Date()
    let christmas = new Date(date.getFullYear(), 11, 25).getTime()
    let diff = christmas - date.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    
    $: day = Math.ceil(diff / oneDay)
    $: hour = diff / (60 * 60 * 1000) % 24
    $: minute = diff / (60 * 1000) % (60)
    $: seconds = diff / 1000 % 60
    setInterval(() => {
        date = new Date()
        diff = christmas - date.getTime()
    }, 100)


</script>

<div class="flex flex-col w-full h-[90vh] items-center justify-center">
    <h1 class="h1 mb-10">Countdown to Christmas</h1>
    <p class="text-center text-xl">{day.toFixed()} days | {Math.floor(hour)} hours | {Math.floor(minute)} minutes | {Math.floor(seconds)} seconds</p>
</div>