<script lang="ts">
    import { T } from '@threlte/core'
    import { OrbitControls } from '@threlte/extras';


    export let intensity
</script>

<T.Mesh>
    <T.SphereGeometry args={[0.5, 32, 16]} />
    <T.MeshStandardMaterial
    transparent
    emissive="white"
    emissiveIntensity={intensity / 5}
    opacity={0.7}
    color="white" />
</T.Mesh>

<T.Mesh
    position.y={-2}
>
  <T.BoxGeometry args={[4, 0.5, 1]} />
  <T.MeshStandardMaterial
    color="hotpink" />
</T.Mesh>

<T.AmbientLight intensity="{0.1}" />
<T.PointLight 
light="0xffffff"
position.x={0}
position.y={0.4}
 intensity={intensity}
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