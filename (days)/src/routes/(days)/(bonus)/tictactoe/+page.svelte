<script lang="ts">
    let playerOneTurn: boolean = true
    let victoryMessage: string = ""

    const board: string[][] = []
    function setUpBoard() {
        for (let r = 0; r < 3; r++) {
            board[r] = []
            for (let c = 0; c < 3; c++) {
                board[r][c] = ""
            }
        }
        victoryMessage = ""
    }

    setUpBoard()

    function handleClick(e: MouseEvent) {
        // @ts-ignore
        const [value, row, col] = (e.target.id).split(',')

        if (value !== "") {
            return
        }

        if (playerOneTurn) {
            board[Number(row)][Number(col)] = 'X'
        }
        else if (!playerOneTurn) {
            board[Number(row)][Number(col)] = 'O'
        }

        if (checkWin() === true) {
            if (playerOneTurn)
                victoryMessage = "Player One Won"
            else 
                victoryMessage = "Player Two Won"
        }

        playerOneTurn = !playerOneTurn
    }

    function checkWin(): boolean {
        // CHECK ROWS
        for (let r = 0; r < 3; r++) {
            if (board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][0] !== "") return true
        }

        // CHECK COLS
        for (let c = 0; c < 3; c++) {
            if (board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[0][c] !== "") return true
        }

        // CHECK DIAGONAL
        if (((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "")
        || (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] !== ""))) {
            return true
        }
        
        return false
    }
</script> 

<div class="flex flex-col justify-center items-center w-full h-[80vh] gap-10">

    <h1 class="h-10 h3">{victoryMessage}</h1>

    <div class="grid grid-cols-3 w-80 text-5xl">
    {#each board as r, row}
        {#each r as cell, col}
            <button class="border-2 h-28" on:click={(e) => handleClick(e)} id={`${cell},${row},${col}`}>
                <span>{cell}</span>
            </button>
        {/each}
    {/each}
    </div>
    <button class="btn variant-ghost-primary rounded-xl" on:click={() => setUpBoard()}>RESET</button>
</div>