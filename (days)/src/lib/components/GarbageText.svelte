<script lang="ts">
    import { onMount } from 'svelte'

    export let originalText: string
    let scrambledText = ''
    const transitionDuration = 300 // Number of frames
    const framesPerUpdate = 4

    onMount(() => {
        scrambleText()
    })

    function scrambleText() {
        let startTime: number 
        let frameCount = 0

        function step(timestamp: number) {
            if (!startTime) {
                startTime = timestamp
            }

            const progress = timestamp - startTime
            const percentage = Math.min(progress/ transitionDuration, 1)

            if (percentage < 1) {
                // while transition not done, generate scrambled text every frame
                if (frameCount === 0) {
                    scrambledText = generateScrambledText(originalText, percentage)
                }

                frameCount = (frameCount + 1) % framesPerUpdate
                requestAnimationFrame(step) 
            } 
            // transition is done so display original elf name
            else {
                scrambledText = originalText
            }
        }

        requestAnimationFrame(step)
    }

    function generateScrambledText(original: string, percentage: number) {
        const characters = '!@#$%^&*()_-+=[]{}|;:,.<>?/~`'
        let currentScramble = ''

        for (let i = 0; i < original.length; i++) {
            // get a random character
            const randomIndex = Math.floor(Math.random() * characters.length)
            const scrambledChar = characters.charAt(randomIndex)

            currentScramble += scrambledChar
        }

        let percentageIndex = original.length * percentage
        let percentageScrambled = currentScramble.slice(percentageIndex, original.length)
        let percentageOriginal = original.slice(0, percentageIndex)
        let output = percentageOriginal + percentageScrambled

        return output
    }
</script>

<div class="inline-block">
    {scrambledText}
</div>