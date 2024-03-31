<script lang="ts">
    export let data

    let answers: boolean[] = []
    let score: number
    let finished:boolean = false

    function calculateScore() {
        console.log('hi')
        score = 0
        for (let answer of answers) {
            if (answer === true) score++
        }
        finished = true
    }

    
</script>

<div class="flex flex-col w-1/2 items-center justify-center gap-4">
    {#if !finished}
    {#each data.quiz as question, index}
        <div class="card w-full p-4 h-42 max-w-96 h-40 flex flex-col justify-around">
            <p>{index + 1}. {question.question}</p>
            <select name="" id="" class="select w-1/2 mt-2" bind:value={answers[index]}>
                <option value="" disabled selected>Select an Option</option>
                {#each question.answers as answer}
                    <option value={answer.correct}>{answer.text}</option>
                {/each}
            </select>
        </div>
        {/each}
        <button class="btn bg-green-800 rounded-md" on:click={() => calculateScore()}>Submit</button>
    {:else}
    <div class="flex flex-col items-center">
        <p class="mb-3">Score: {score}/20</p>
        <button on:click={() => finished = false} class="btn bg-green-800 rounded-lg p-2">Retry</button>
    </div>
    {/if}
</div>

