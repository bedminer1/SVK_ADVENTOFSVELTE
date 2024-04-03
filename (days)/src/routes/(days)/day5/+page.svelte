<script lang="ts">
    import { onMount } from "svelte"

    type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT'

    interface Task {
        elf: string
        task: TaskType
        minutesTaken: number
        date: string;
    }

    export let data
    const { tasks } = data

    let date = new Date()
    setInterval(() => {
        date = new Date()
    }, 1000)
    $: time = date.toLocaleTimeString()

    function timeToSeconds(time: string): number {
        const timeArr = time.split(':')
        let output: number = 0
        output += Number(timeArr[0]) * 60 * 60
        output += Number(timeArr[1]) * 60
        output += Number(timeArr[2])
        return output
    }

    $: currSeconds = timeToSeconds(time)

    let completedTasks: Task[] = []

    setInterval(() => {
        completedTasks = []
        for (let task of tasks) {
            if (timeToSeconds(task.date.slice(11, 19)) < currSeconds) {
                completedTasks.push(task)
            }
        }
    }, 1000)


   
    let toysCreated: number = 0
    let presentsWrapped: number = 0

    setInterval(() => {
        toysCreated = 0
        presentsWrapped = 0
        for (let task of completedTasks) {
            if (task.task === 'CREATED_TOY') {
                toysCreated++
            } else {
                presentsWrapped++
            }
        }
    }, 1000)

    $: toysCreatedRate = toysCreated / (currSeconds / 60 / 60)
    $: presentsWrappedRate = presentsWrapped / (currSeconds / 60 / 60)

</script>

<div class="flex justify-center flex-col items-center">
    {#if toysCreated === 0} 
        <p>...loading</p>
    {:else}
    <h1 class="h1 mb-10">Santa's Workshop Tracker</h1>
    <div class="card p-3 rounded-md">
        <h1>current time: {time}</h1>
        <p>toys created: {toysCreated}</p>
        <p>toys created per hour: {toysCreatedRate.toFixed(2)}</p>
        <p>presents wrapped: {presentsWrapped}</p>
        <p>presents wrapped per hour: {presentsWrappedRate.toFixed(2)}</p>
    </div>
    {/if}
</div>