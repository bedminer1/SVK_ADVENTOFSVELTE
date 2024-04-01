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
    export let fullScreen = true

    export let particles: Particle[] = []

    let svg: SVGElement
    let width = 0
    let height = 20
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

        let rect = svg.getBoundingClientRect();

        // count represents the number of snowflakes spawned per frame
        const count = rate * uniform(0, 2) * delta / 1000
        for (let i = 0; i < count; i++) {
            particles.push({
                // width represents the horizontal window where snowflake can spawn
                x: uniform(-rect.left, rect.right),
                // spawn at the top
                y: -1,
                // horizontal speed, + for right, - for left
                vx: uniform(0, driftVariance) + drift,
                // vertical speed
                vy: uniform(-gravityVariance, gravityVariance) + gravity,
                size: Math.random() * size
            })
        }

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i]

            // updating position 
            p.x += p.vx * delta / 1000
            p.y += p.vy * delta / 1000

            // if p out of bounds, remove it 
            if (
                p.y > rect.height + 1  ||
                p.x < 0 ||
                p.x > rect.width
            ) {
                particles.splice(i--, 1)
            }
        }
        // update state between frames
        particles = particles

        frameHandle = requestAnimationFrame(loop)
    }
</script>

<svg 
    bind:this={svg}
	class:fullScreen
	class="absolute bg-opacity-0 pointer-events-none w-full h-full"
>
    {#each particles as p (p)}
		<circle cx={p.x} cy={p.y} r={p.size} class="fill-white"></circle>
	{/each}
</svg>

<style>
	.fullScreen {
		width: 100vw;
		height: 100vh;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
	}
</style>
<!-- <div
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
</div> -->
