<script lang="ts">
    const morseCode = new Map([
    ["A", ".-"],
    ["B", "-..."],
    ["C", "-.-."],
    ["D", "-.."],
    ["E", "."],
    ["F", "..-."],
    ["G", "--."],
    ["H", "...."],
    ["I", ".."],
    ["J", ".---"],
    ["K", "-.-"],
    ["L", ".-.."],
    ["M", "--"],
    ["N", "-."],
    ["O", "---"],
    ["P", ".--."],
    ["Q", "--.-"],
    ["R", ".-."],
    ["S", "..."],
    ["T", "-"],
    ["U", "..-"],
    ["W", ".--"],
    ["X", "-..-"],
    ["Y", "-.--"],
    ["Z", "--.."],
    [" ", "  "],
    ])

    let input: string = ''

    function encode(input: string): string {
        const str: string = input.toUpperCase()
        const res: string[] = []

        for (const char of str) {
            res.push(morseCode.get(char) || '')
        }
        return res.join(' ')
    }
    
    $: encodedInput = encode(input)
</script>


<p class="text-sm">
    encoded: <pre>{encodedInput}</pre>

<form class="w-1/2">
    <input type="text" class="input w-1/2 rounded-sm" bind:value={input}>
</form>