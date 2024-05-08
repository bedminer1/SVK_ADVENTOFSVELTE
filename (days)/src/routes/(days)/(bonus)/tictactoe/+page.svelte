<script lang="ts">
    const board: string[][] = []
    for (let r = 0; r < 3; r++) {
        board[r] = []
        for (let c = 0; c < 3; c++) {
            board[r][c] = ""
        }
    }

    let playerOneTurn: boolean = true

    console.log(board)
    function handleClick(e: MouseEvent) {
        // @ts-ignore
        const [value, row, col] = (e.target.id).split(',')

        if (value !== "") {
            return
        }

        if (playerOneTurn) {
            board[Number(row)][Number(col)] = 'X'
            playerOneTurn = false
        }
        else if (!playerOneTurn) {
            board[Number(row)][Number(col)] = 'O'
            playerOneTurn = true
        }
    }
</script>

<div class="flex justify-center items-center w-full h-[90vh]">
    <div class="grid grid-cols-3 w-80 text-5xl">
    {#each board as r, row}
        {#each r as cell, col}
            <button class="border-2 h-28" on:click={(e) => handleClick(e)} id={`${cell},${row},${col}`}>
                <span>{cell}</span>
            </button>
        {/each}
    {/each}
    </div>
</div>