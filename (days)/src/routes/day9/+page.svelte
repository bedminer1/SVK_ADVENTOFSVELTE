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

<div>
    <h1>Countdown to Christmas</h1>
    <p>{day.toFixed()} days | {Math.floor(hour)} hours | {Math.floor(minute)} minutes | {Math.floor(seconds)} seconds</p>
</div>