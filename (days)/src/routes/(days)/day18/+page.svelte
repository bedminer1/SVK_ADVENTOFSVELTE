<script lang="ts">
    export let data

    interface Answer {
        text: string
        correct: boolean
    }


    const { correctAnswers } = data
    let answers: string[] = []
    let score: number
    let finished:boolean = false

    function calculateScore() {
        score = 0
        for (let i in answers) {
            if (answers[i] === correctAnswers[i]) score++
        }
        finished = true
    }
    
</script>

{#if !finished}
<div class="flex flex-col items-center w-full gap-10">
    <h1 class="h1 my-10">Santa's Christmas Trivia</h1>
    <div class="grid grid-cols-3 w-4/5 items-center justify-center gap-4">
        {#each data.quiz as question, index}
            <div class="card w-full p-4 h-52 max-w-96 flex flex-col justify-around">
                <p>{index + 1}. {question.question}</p>
                <select name="" id="" class="select w-1/2 mt-2 rounded-lg" bind:value={answers[index]}>
                    <option value="" disabled selected>Select an Option</option>
                    {#each question.answers as answer}
                        <option value={answer.text}>{answer.text}</option>
                    {/each}
                </select>
            </div>
            {/each}
        </div>
            <button class="btn bg-green-800 rounded-md" on:click={() => calculateScore()}>Submit</button>
</div>
    {:else}
    <div class="flex flex-col items-center">
        <p class="mb-3">Score: {score}/20</p>
        <button on:click={() => finished = false} class="btn bg-green-800 rounded-lg p-2">Retry</button>
    </div>
    {/if}


