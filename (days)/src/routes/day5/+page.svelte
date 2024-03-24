<script lang="ts">
    import { onMount } from "svelte"

    type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT'

    interface Task {
        elf: string
        task: TaskType
        minutesTaken: number
        date: string;
    }

    let tasks: Task[]

    onMount(async () => {
        setInterval(async () => {
            const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json')
            tasks = await response.json()
        }, 1000)
    })
</script>

<div>
    {JSON.stringify(tasks)}
</div>