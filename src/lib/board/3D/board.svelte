<script lang="ts">
	import { T } from '@threlte/core';
	import {FakeGlowMaterial, OrbitControls, interactivity, Text } from '@threlte/extras';
	import { BoxGeometry, Color, MeshStandardMaterial } from 'three';
	import { walls } from '$lib/board/3D/CreateWalls';
	import { setNewMove, setAllMoves, isLastMove } from '$lib/board/logic.svelte';

	// Not remove! Interactivity for hover and click
	interactivity();

	setAllMoves(walls)
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 10]}>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>
<T.AmbientLight intensity={1} />

{#each walls as wall}
	<T.Group
		position={[wall.x, wall.y, wall.z]}
		rotation={wall.rotation}>
		{#each wall.lines as line}
			<T.Mesh
				position.x={line.x}
				position.y={line.y}
				position.z={line.z}
				geometry={new BoxGeometry(line.w, line.h, 0.1)}
				material={new MeshStandardMaterial({ color: 'black' })}
			/>
		{/each}
		{#each wall.board as box}
			<T.Mesh
				position.x={box.x}
				position.y={box.y}
				position.z={box.z}
				onpointerenter={(e: PointerEvent) => {
					e.stopPropagation();
					box.color = 'red';
				}}
				onpointerleave={() => {
					box.color = 'white';
				}}
				onclick={(e: PointerEvent) => {
					e.stopPropagation();
					setNewMove(box)
				}}
				geometry={new BoxGeometry(1, 1, 0.1)}
				material={new MeshStandardMaterial({ color: box.color })}
			>
				<Text
					font="./font.woff"
					position.z="-0.1"
					text={box.text}
					color={box.text === 'X' ? 'red' : 'blue' }
					fontSize={1}
					anchorX="50%"
					anchorY="50%"
				/>
			</T.Mesh>
			{#if box.text !== '' && isLastMove(box.id)}
			<T.Mesh
				position.x={box.x}
				position.y={box.y}
				position.z={box.z}>
				<FakeGlowMaterial glowColor={box.text === 'X' ? 'red' : 'blue'}/>
				<T.IcosahedronGeometry args={[1, 1]} />
			</T.Mesh>
				{/if}
		{/each}
	</T.Group>
	<T.Mesh position.x={0}
					position.y={2}
					position.z={0}
					geometry={new BoxGeometry(4, 0.1, 4)}
					material={new MeshStandardMaterial({ color: 'white' })}>
	</T.Mesh>
	<T.Mesh position.x={0}
					position.y={-2}
					position.z={0}
					geometry={new BoxGeometry(4, 0.1, 4)}
					material={new MeshStandardMaterial({ color: 'white' })}>
	</T.Mesh>
{/each}