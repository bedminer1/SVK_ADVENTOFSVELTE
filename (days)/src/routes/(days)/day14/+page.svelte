<script lang="ts">
    import Snowfall from '$lib/components/snowfall.svelte'

    const defaults = {
		gravity: 100,
		gravityVariance: 10,
		drift: 70,
		driftVariance: 50,
		rate: 5,
		size: 2,
	}

    let settings = {...defaults}
    let particles: Particle[] = []
</script>

<div>
    <Snowfall 
    {...settings}
    {particles}
    />
</div>