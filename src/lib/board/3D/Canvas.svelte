<script>
	import { Canvas } from '@threlte/core';
	import Scene from './board.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	const small = new MediaQuery("min-width: 500px")
</script>

<div class="canvas">
	<Canvas>
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