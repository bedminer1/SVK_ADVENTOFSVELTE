<script lang="ts">
    import { onMount } from 'svelte'
    import { Line } from 'svelte-chartjs'
    import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Chart,
  } from 'chart.js'

    ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  );

    ChartJS.defaults.color = 'rgb(255, 255, 255)'

    let data: number[] = []
    $: reverse = [...data].reverse()

    $: myData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
            label: 'heart rate',
            data: data,
            borderWidth: 1,
            borderColor: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(255, 255, 255)'
        }]
    }

    onMount(async () => {
        setInterval(async() => {
            try {
                const response = await fetch("https://advent.sveltesociety.dev/data/2023/day-four.json")
                let temp: {heartRate: number} = await response.json()
                data = [...data, temp.heartRate]
                if (data.length > 10) {
                    data.shift()
                }
            } catch (err) {
                console.log(err)
                throw err
            }
        }, 1000)

    })
</script>

<div>
    Last 10 readings: {JSON.stringify(reverse)}
    <Line data={myData} width={100} height={50} options={{ animation: false }}/>
</div>
