<script lang="ts">
    import { timeToSeconds } from '$lib/utils/timeConverter'
    import BarChart from '$lib/components/BarChart.svelte'

    export let data
    const tasks: Task[] = data.tasks

    // how many seconds passed since midnight
    let time = new Date().toLocaleTimeString()
    $: currSeconds = timeToSeconds(time)

    // sort tasks into done and not done
    let completedTasks: Task[] = []

    // count total of each task
    let toysCreated: number = 0
    let presentsWrapped: number = 0

    // count by hour
    const toysByHour = new Array(24)
    const presentsByHour = new Array(24)
    for (let i = 0; i < 24; i++) {
        toysByHour[i] = new Set<Task>()
        presentsByHour[i] = new Set<Task>()
    }
    const toysByHourData: number[] = []
    const presetnsByHourData: number[] = []

    
    let toyLabel: string[] = []
    $: {
        toyLabel = []
        for (let i = 0; i < toysByHourData.length; i++) {
            toyLabel.push((i + 1).toString())
        }
    }
    // datasets for chartjs
    $: toysData = {
        labels: toyLabel,
        datasets: [{
            label: 'toys created at each hour',
            data: toysByHourData,
            borderWidth: 1,
            backgroundColor: 'white'
        }],
    }

    // rates of each task
    $: toysCreatedRate = toysCreated / (currSeconds / 60 / 60)
    $: presentsWrappedRate = presentsWrapped / (currSeconds / 60 / 60)

    // update and check every second
    // TODO: add caching
    setInterval(() => {
        // update the time
        time = new Date().toLocaleTimeString()

        // iterate through and all tasks done before 'now' is added
        completedTasks = []
        toysCreated = 0
        presentsWrapped = 0

        for (let task of tasks) {
            if (timeToSeconds(task.date.slice(11, 19)) < currSeconds) {
                completedTasks.push(task)
                
                 // iterate through completed tasks,
                //  find total of each task + at each hour
                const hour = Number(task.date.slice(11, 13))
                if (task.task === 'CREATED_TOY') {
                    toysCreated++
                    toysByHour[hour] = new Set([...toysByHour[hour], task])
                    toysByHourData[hour] = toysByHour[hour].size
                } else {
                    presentsWrapped++
                    presentsByHour[hour] = new Set([...presentsByHour[hour], task])
                    presetnsByHourData[hour] = presentsByHour[hour].size
                }
            }
        }
    }, 1000)
    
</script>

<div class="w-2/3 ">
    <p>time: {time}</p>
    <p>toys created: {toysCreated}</p>
    <p>toys created per hour: {toysCreatedRate.toFixed(2)}</p>
    <BarChart data={toysData} />
    <p>presents wrapped: {presentsWrapped}</p>
    <p>presents wrapped per hour: {presentsWrappedRate.toFixed(2)}</p>
</div>