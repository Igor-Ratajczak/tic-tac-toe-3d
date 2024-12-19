<script lang="ts">
	import Boards2D from '$lib/game/board/2D/boards.svelte';
	import Board3D from '$lib/game/board/3D/Canvas.svelte';
	import { userState } from '$lib/state.svelte.js';
	import { fly } from 'svelte/transition';
	import { bot } from '$lib/game/logic/bot.svelte';

	$effect(() => {
		if (userState.moves.length < 64 && !userState.win && userState.playerTurn === 'X') {
			bot();
		}
	});

</script>
<div class="board-container">
	{#if userState.board === '2D'}
		<div class="2D" in:fly={{ x: -500, duration: 800, delay: 800 }} out:fly={{ x: -800, duration: 800 }}>
			<Boards2D />
		</div>
	{:else}
		<div class="3D" in:fly={{ x: 500, duration: 800, delay: 800}} out:fly={{ x: 800, duration: 800 }}>
			<Board3D />
		</div>
	{/if}
</div>
<style lang="less">
  .board-container {
    width: 100vw;
    height: max-content;
    display: flex;
  }

</style>