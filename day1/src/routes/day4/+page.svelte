<script lang="ts">
    import { onMount } from 'svelte'
    import { Line } from 'svelte-chartjs'
    import { type ChartData, type ChartOptions } from 'chart.js'

    let data: number[] = []
    $: myData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
            label: 'hi',
            data: data,
            borderWidth: 1
        }]
    }

    onMount(async () => {
        setInterval(async() => {
            const response = await fetch("https://advent.sveltesociety.dev/data/2023/day-four.json")
            let temp: {heartRate: number} = await response.json()
            data = [...data, temp.heartRate]
            if (data.length > 10) {
                data.shift()
            }
        }, 1000)

    })
</script>

<div>
    {JSON.stringify(data)}
    <Line data={myData} width={100} height={200}/>
</div>
