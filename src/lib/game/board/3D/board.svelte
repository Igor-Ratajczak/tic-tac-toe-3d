<script lang="ts">
	import { T } from '@threlte/core';
	import { Environment, FakeGlowMaterial, interactivity, Text, Text3DGeometry } from '@threlte/extras';
	import { BoxGeometry, MeshStandardMaterial } from 'three';
	import { wallData, createWall } from '$lib/game/board/3D/CreateWalls';
	import { setNewMove, setAllMoves, isLastMove } from '$lib/game/board/logic.svelte.js';
	import { globalSettings, userState } from '$lib/state.svelte.js';

	let ColorX = $state('#ff0000');
	let ColorO = $state('#0000ff');
	let backgroundFields = $state('#ffffff');
	let borderFields = $state('#000000');
	let backgroundWin = $state('#008000');
	let colorHighlight = $state('#ff0000');

	let walls = $state(wallData.map((wall) => ({
		...wall,
		...createWall(wall.id)
	})));

	globalSettings.subscribe((settings) => {
		const settingsMap = Object.fromEntries(settings.map(setting => [setting.key, setting.value]));
		ColorX = settingsMap['colorX'];
		ColorO = settingsMap['colorO'];
		backgroundFields = settingsMap['backgroundFields'];
		borderFields = settingsMap['borderFields'];
		backgroundWin = settingsMap['backgroundWin'];
		colorHighlight = settingsMap['colorHighlight'];

		walls.forEach((wall) => {
			wall.board.forEach((box) => {
				box.color = backgroundFields;
			});
		});
	});

	setAllMoves(walls);

	interactivity();

	$effect(() => {
		userState.moves;
		if (userState.win) {
			walls.forEach((wall) => {
				wall.board.forEach((box) => {
					box.color = userState.winningFields.includes(box.id) ? backgroundWin : backgroundFields;
				});
			});
		}
	});

	$effect(() => {
		walls.forEach(wall => {
			wall.board.forEach((field) => {
				userState.moves[userState.moves.length - 1].id === field.id ? (field.text = userState.moves[userState.moves.length - 1].text) : null;
			});
		});
	});

</script>

{#each walls as wall}
	<T.Group
		position={[wall.x, wall.y, wall.z]}
		rotation={wall.rotation}>
		<T.Mesh position={[-0.5,-0.5,0]} rotation.x={Math.PI}>
			<Text3DGeometry
				text={wall.id}
				bevelEnabled="true"
				bevelOffset={0}
				bevelSegments={20}
				bevelSize={0.1}
				bevelThickness={0.1}
				size={1}
				height={0.01}
				curveSegments={12}
				depth={0.1}
				smooth={0.1}
			/>
			<T.MeshStandardMaterial
				color="#FD3F00"
				toneMapped={false}
				metalness={1.0}
				roughness={0.1}
			/>
		</T.Mesh>
		{#each wall.lines as line}
			<T.Mesh
				position.x={line.x}
				position.y={line.y}
				position.z={line.z}
				geometry={new BoxGeometry(line.w, line.h, 0.1)}
				material={new MeshStandardMaterial({ color: borderFields })}
			/>
		{/each}
		{#each wall.board as box}
			<T.Mesh
				position.x={box.x}
				position.y={box.y}
				position.z={box.z}
				onpointerenter={(e: PointerEvent) => {
					e.stopPropagation();
					box.color = colorHighlight;
				}}
				onpointerleave={() => {
					box.color = userState.winningFields.includes(box.id) ? backgroundWin : backgroundFields;
				}}
				onclick={(e: PointerEvent) => {
					e.stopPropagation();
					if (!userState.win && box.text === '')
					setNewMove(box.id)
				}}
				geometry={new BoxGeometry(1, 1, 0.1)}
				material={new MeshStandardMaterial({ color: box.color })}
			>
				<Text
					font="./font.woff"
					position.z="-0.1"
					text={box.text}
					color={box.text === 'X' ? ColorX : ColorO }
					fontSize={1}
					anchorX="50%"
					anchorY="50%"
				/>
			</T.Mesh>
			{#if userState.winningFields.includes(box.id) || !userState.win && box.text !== '' && userState.moves.length > 0 ? isLastMove(box.id) : null }
				<T.Mesh
					position.x={box.x}
					position.y={box.y}
					position.z={box.z}>
					<FakeGlowMaterial glowColor={userState.win ? backgroundWin : box.text === 'X' ? ColorX : ColorO} />
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
<Environment url="./shanghai_riverside_1k.hdr" />
