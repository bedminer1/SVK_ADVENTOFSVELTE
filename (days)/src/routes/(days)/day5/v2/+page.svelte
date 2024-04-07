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
    // keep track of index of last completed task for caching
    let lastIndex = 0

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
    const presentsByHourData: number[] = []

    // filling in labels with at each hour up to curr time
    let timeLabel: string[] = []
    $: {
        timeLabel = []
        for (let i = 0; i < toysByHourData.length; i++) {
            timeLabel.push((i).toString().padStart(2, '0') + ' : 00')
        }
    }

    // datasets for chartjs
    $: toysData = {
        labels: timeLabel,
        datasets: [{
            label: 'Toys Created',
            data: toysByHourData,
            borderWidth: 1,
            backgroundColor: '#DCC7EA'
        }],
    }
    $: presentsData = {
        labels: timeLabel,
        datasets: [{
            label: 'Presents Wrapped',
            data: presentsByHourData,
            borderWidth: 1,
            backgroundColor: '#DCC7EA'
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
        for (let i = lastIndex + 1; i < tasks.length; i++) {
            let task = tasks[i]
            if (timeToSeconds(task.date.slice(11, 19)) < currSeconds) {
                completedTasks = [...completedTasks, task]
                lastIndex = i
                
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
                    presentsByHourData[hour] = presentsByHour[hour].size
                }
            } 
            // stops from doing unneeded iterations
            else break
        }
    }, 1000)
    
</script>

<div class="w-2/3 ">
    <p>time: {time}</p>
    <p>5 Most Recent Task: {JSON.stringify(completedTasks.slice(-5).reverse())}</p>
    <p>toys created: {toysCreated}</p>
    <p>toys created per hour: {toysCreatedRate.toFixed(2)}</p>
    <BarChart data={toysData} />
    <p>presents wrapped: {presentsWrapped}</p>
    <p>presents wrapped per hour: {presentsWrappedRate.toFixed(2)}</p>
    <BarChart data={presentsData} />
</div>