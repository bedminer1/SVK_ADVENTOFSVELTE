<script lang="ts">
    import { onMount } from "svelte";
    import { Canvas, T } from "@threlte/core";
  import { CircleGeometry, Mesh, MeshBasicMaterial, OrthographicCamera } from "three";

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

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i]

            // slight variation in speed from frame to frame
            p.vx += uniform(-0.1, 0.1)
            p.vy += uniform(-0.1, 0.1)

            // updating position 
            p.x += p.vx * delta / 1000
            p.y += p.vy * delta / 1000

            // if p out of bounds, remove it 
            if (
                p.y < -height ||
                p.y > height + 10 ||
                p.x < -width ||
                p.x > width * 2
            ) {
                particles.splice(i--, 1)
            }
        }
        // update state between frames
        particles = particles

        frameHandle = requestAnimationFrame(loop)
    }
</script>

<div
    {...$$restProps}
    bind:clientWidth={width}
    bind:clientHeight={height}
>
    <Canvas>
        <T.OrthographicCamera 
            makeDefault
            args={[0, width, 0, height]}
            position={[width / 2, -height / 2, 1]}
        />

        {#each particles as p (p)}
            {@const { x, y, size } = p}
            <T.Mesh position={[x, -y, 0]}>
                <T.CircleGeometry args={[size, 32]}/>
                <T.MeshBasicMaterial />
            </T.Mesh>
        {/each}
    </Canvas>
</div>
