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
    const labels: string[] = []
    for (let i = 0; i < 50; i++) {
        labels.push((i + 1).toString())
    }

    let data: number[] = []
    $: reverse = [...data].reverse().slice(0, 10)
    $: min = Math.min(...data) - 3
    $: max = Math.max(...data) + 3
    
    $: myData = {
        labels: labels,
        datasets: [{
            label: 'heart rate',
            data: data,
            borderWidth: 1,
            borderColor: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(255, 255, 255)'
        }],
    }

    onMount(async () => {
        setInterval(async() => {
            try {
                const response = await fetch("https://advent.sveltesociety.dev/data/2023/day-four.json")
                let temp: {heartRate: number} = await response.json()
                data = [...data, temp.heartRate]
                if (data.length > 50) {
                    data.shift()
                }
            } catch (err) {
                console.log(err)
                throw err
            }
        }, 1000)

    })
</script>

<div class="w-2/3">
    <h1 class="h1 text-center mb-10">Santa's Heart Monitor</h1>
    Last 10 readings: {JSON.stringify(reverse)}
    <Line data={myData} width={100} height={50} 
    options={{ 
        animation: false, 
        scales: { 
            y: { 
                min: min, max: max
            }
        }
    }}/>
</div>
