<script>
	import { T, Canvas } from '@threlte/core';
	import Scene from './board.svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { OrbitControls } from '@threlte/extras';

	const small = new MediaQuery('min-width: 500px');
</script>

<div class="canvas">
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[0, 0,  small.current ? 10 : 20]}>
			<OrbitControls enableDamping />
		</T.PerspectiveCamera>
		<T.AmbientLight intensity={1} />
		<Scene />
	</Canvas>
</div>

<style>
    .canvas {
        width: 100vw;
        height: calc(100vh - 192px);
        z-index: 100;
    }
</style>