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
    const snapshotTime = timeToSeconds(new Date().toLocaleTimeString())

    let completedTasks: Task[] = []
    for (let task of tasks) {
        if (timeToSeconds(task.date.slice(11, 19)) < snapshotTime) {
            completedTasks.push(task)
        }
    }

</script>

<div>
    {time} {currSeconds}
    
</div>