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
</script>
