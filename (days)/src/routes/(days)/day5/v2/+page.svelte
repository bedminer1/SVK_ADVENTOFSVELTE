<script lang="ts">
    import { timeToSeconds } from '$lib/utils/timeConverter'
    import BarChart from '$lib/components/BarChart.svelte'
    import LineChart from '$lib/components/LineChart.svelte'

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

    // rates of each task
    $: toysCreatedRate = toysCreated / (currSeconds / 60 / 60)
    $: presentsWrappedRate = presentsWrapped / (currSeconds / 60 / 60)

    // count by hour
    const toysByHour = new Array(24)
    const presentsByHour = new Array(24)
    for (let i = 0; i < 24; i++) {
        toysByHour[i] = new Set<Task>()
        presentsByHour[i] = new Set<Task>()
    }
    const toysByHourData: number[] = []
    const presentsByHourData: number[] = []

    // get a cumulative version
    let cumulativeToysData: number[] = []
    let cumulativePresentsData: number[] = []

    // filling in labels with at each hour up to curr time
    let timeLabel: string[] = []
    $: {
        timeLabel = []
        for (let i = 0; i < toysByHourData.length; i++) {
            timeLabel.push((i).toString().padStart(2, '0') + ' : 00')
        }
    }

    // datasets for chartjs
    $: toysBarData = {
        labels: timeLabel,
        datasets: [{
            label: 'Toys Created',
            data: toysByHourData,
            borderWidth: 1,
            backgroundColor: '#DCC7EA',
        }],
    }
    $: toysLineData = {
        labels: timeLabel,
        datasets: [{
            label: 'Cumulative Toys Created',
            data: cumulativeToysData,
            borderWidth: 1,
            borderColor: '#DCC7EA',
            backgroundColor: '#DCC7EA'
        }],
    }
    $: presentsBarData = {
        labels: timeLabel,
        datasets: [{
            label: 'Presents Wrapped',
            data: presentsByHourData,
            borderWidth: 1,
            backgroundColor: '#DCC7EA'
        }],
    }
    $: presentsLineData = {
        labels: timeLabel,
        datasets: [{
            label: 'Cumulative Toys Created',
            data: cumulativePresentsData,
            borderWidth: 1,
            borderColor: '#DCC7EA',
            backgroundColor: '#DCC7EA'
        }],
    }

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

        // check accumulator
        let cumToys = 0
        let cumPresents = 0
        for (let i = 0; i <= Number(completedTasks.at(-1)?.date.slice(11, 13)); i++) {
            cumToys += toysByHourData[i]
            cumPresents += presentsByHourData[i]
            cumulativeToysData[i] = cumToys
            cumulativePresentsData[i] = cumPresents
        }
    }, 1000)
    
</script>

<div class="w-2/3 flex flex-col gap-10">
    <div class="w-full flex flex-col items-center">
        <h1 class="h1">
            Santa's Workshop Tracker
        </h1>
        <h2 class="h2">{time}</h2>
        <p>current time</p>
        <p>5 December 2023</p>
    </div>
    <p>Recent Tasks: <br> {JSON.stringify(completedTasks.slice(-5).reverse())}</p>
    
    <div>
        <h1>Toy Factory Stats</h1>
        <p>toys created: {toysCreated}</p>
        <p>toys created per hour: {toysCreatedRate.toFixed(2)}</p>
        <div class="w-1/2 flex gap-10">
            <LineChart data={toysLineData} />
            <BarChart data={toysBarData} />
        </div>
    </div>
    
    <div>
        <h1>Wrapping Factory Stats</h1>
        <p>presents wrapped: {presentsWrapped}</p>
        <p>presents wrapped per hour: {presentsWrappedRate.toFixed(2)}</p>
        <div class="w-1/2 flex gap-10">
            <LineChart data={presentsLineData} />
            <BarChart data={presentsBarData} />
        </div>
    </div>
    
</div>