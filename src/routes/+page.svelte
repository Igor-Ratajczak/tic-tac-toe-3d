<script lang="ts">
	import Boards from './board/boards.svelte';
	import Menu from './menu/menu.svelte';
	import { userState } from './state.svelte';

	let text = $state('Witaj w grze kółko i krzyżyk');

	$effect(() => {
		text = `Ruch ${userState.move} gracza ${userState.tour}`;
	});

	const setBoard = (board: '2D' | '3D') => {
		userState.board = board;
	};

</script>

<div class="root">
	<h1>{ text }</h1>
	<div class="select-board" style:--position-x_select-board-active="{userState.board === '2D' ? '-3%' : '53%'}">
		<button onclick="{() => setBoard('2D')}">Wybierz plansze 2D</button>
		<button onclick="{() => setBoard('3D')}">Wybierz planszę 3D</button>
	</div>
	<Boards />
	<Menu />
</div>
<style lang="less">
  .root {
    display: grid;
    grid-template-rows: 60px 40px auto max-content;
    height: 100%;
    justify-items: center;

    h1 {
      grid-row: 1;
      font-size: 35px;
    }

    .select-board {
      display: flex;
      gap: 2em;
      position: relative;

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
  }
</style>