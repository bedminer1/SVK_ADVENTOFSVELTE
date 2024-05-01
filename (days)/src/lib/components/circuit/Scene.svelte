<script lang="ts">
    import { T } from '@threlte/core'
    import { interactivity } from '@threlte/extras'
    import { spring } from 'svelte/motion'
    import { OrbitControls } from '@threlte/extras';

    interactivity()
    const scale = spring(1)
</script>

<T.Mesh
    scale={$scale}
    on:pointerenter={() => scale.set(1.1)}
    on:pointerleave={() => scale.set(1)}
>
    <T.SphereGeometry args={[1, 32, 16]} />
    <T.MeshStandardMaterial color="white" />
</T.Mesh>

<T.Mesh
    position.y={-2}
>
  <T.BoxGeometry args={[4, 0.5, 1]} />
  <T.MeshStandardMaterial color="hotpink" />
</T.Mesh>

<T.AmbientLight intensity={0.1} />
<T.RectAreaLight 
light="0xffffff"
 intensity={1}
 position.z={2}
 />

<T.OrthographicCamera makeDefault zoom={100} position={[-3, 2, 5]}>
	<OrbitControls
		on:create={({ ref }) => {
			ref.minPolarAngle = Math.PI / 4 - 0.9;
			ref.maxPolarAngle = Math.PI / 4 + 0.3;
			ref.maxZoom = 390;
			ref.minZoom = 70;
		}}
	/>
</T.OrthographicCamera>