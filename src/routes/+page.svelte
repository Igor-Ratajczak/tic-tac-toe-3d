<script lang="ts">
	import Boards2D from '$lib/board/boards.svelte';
	import Board3D from '$lib/board/3D/Canvas.svelte';
	import Menu from '$lib/menu/menu.svelte';
	import { userState } from '$lib/state.svelte.js';
	import { fly } from 'svelte/transition';

	let text = $state('Witaj w grze kółko i krzyżyk');

	$effect(() => {
		if (userState.newGame)
			text = `Ruch ${userState.move} gracza ${userState.playerTurn}`;
	});

	const setBoard = (board: '2D' | '3D') => {
		userState.board = board;
	};


</script>

<div class="root">
	<h1>{ text }</h1>
	<div class="select-board" style:--position-x_select-board-active="{userState.board === '2D' ? '-3%' : '53%'}">
		<button onclick="{() => setBoard('2D')}">Plansza 2D</button>
		<button onclick="{() => setBoard('3D')}">Plansza 3D</button>
	</div>
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
	<Menu />
</div>
<style lang="less">
  .root {
    display: grid;
    grid-template-rows: 60px 40px auto max-content;
    height: 100%;
    justify-items: center;
		overflow-x: hidden;

    h1 {
      grid-row: 1;
      font-size: 2.5em;
      align-content: center;
    }

    .select-board {
      display: flex;
      gap: 2em;
      position: relative;
      font-size: 15px;

      &::before {
        content: '';
        position: absolute;
        top: 100%;
        left: calc(var(--position-x_select-board-active));
        width: 50%;
        height: 5px;
        border-bottom: 2px solid red;
        transition: left 0.5s ease-in-out;
      }
    }

    .board-container {
      width: 100vw;
      height: max-content;
      display: flex;
    }
  }
</style>