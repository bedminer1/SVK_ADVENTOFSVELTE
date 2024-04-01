<script lang="ts">
    import Snowfall from '$lib/components/snowfall.svelte'

    const defaults = {
		gravity: 100,
		gravityVariance: 10,
		drift: 0,
		driftVariance: 50,
		rate: 10,
		size: 2,
	}

    let settings = {...defaults}
    let particles: Particle[] = []
</script>

<div class="w-2/3 h-[90vh] content flex flex-col items-center justify-center">
        <Snowfall 
        {...settings}
        {particles}
        />

    <h1 class="h1">눈이 왔다!</h1>

    <div class="absolute top-5 right-2 card p-3 variant-soft-secondary">
        <label for="rate">
            <span>Rate</span>
            <input type="range" min="0.01" max="200" step="0.01"
            bind:value={settings.rate} >
        </label>
        <label for="size">
            <span>Size</span>
            <input type="range" min="0.5" max="4" step="0.01"
            bind:value={settings.size} >
        </label>
        <label for="wind">
            <span>Direction</span>
            <input type="range" min="-200" max="200" step="0.01"
            bind:value={settings.drift} >
        </label>
        <label for="turbulence">
            <span>Turbulence</span>
            <input type="range" min="-200" max="200" step="0.01"
            bind:value={settings.driftVariance} >
        </label>
        <label for="weight">
            <span>weight</span>
            <input type="range" min="50" max="300" step="0.01"
            bind:value={settings.gravity} >
        </label>
    </div>
</div>
