<script lang="ts">
    import { onMount } from "svelte";
    import { Canvas, T } from "@threlte/core";

    export let gravity: number
    export let gravityVariance: number
    export let drift: number
    export let driftVariance: number
    export let rate: number
    export let size: number

    export let particles: Particle[] = []

    let width = 0
    let height = 0
    let lastUpdate: number
    let frameHandle: number

    onMount(() => {
        lastUpdate = Date.now()
        loop()

        return () => cancelAnimationFrame(frameHandle)
    })

    // returns random number between min and max
    function uniform(min: number, max: number): number {
        return min + Math.random() * (max - min)
    }

    function loop() {
        // calculate time between frames
        const now = Date.now()
        const delta = now - lastUpdate
        lastUpdate = now

        // count represents the number of snowflakes spawned per frame
        const count = rate * uniform(0, 2) * delta / 1000
        for (let i = 0; i < count; i++) {
            particles.push({
                // width represents the horizontal window where snowflake can spawn
                x: uniform(-width / 2, width * 1.5),
                // spawn at the top
                y: -10,
                // horizontal speed, + for right, - for left
                vx: uniform(-driftVariance, driftVariance) + drift,
                // vertical speed
                vy: uniform(-gravityVariance, gravityVariance) + gravity,
                size: Math.random() * size
            })
        }
    }
</script>
