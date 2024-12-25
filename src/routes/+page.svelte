<script lang="ts">
	import Menu from '$lib/menu/menu.svelte';
	import { globalSettings, userState } from '$lib/state.svelte.js';
	import Windows from '$lib/window/Windows.svelte';
	import Game from '$lib/game/Game.svelte';
	import { onMount } from 'svelte';

	let text = $state('Witaj w grze kółko i krzyżyk');

	$effect(() => {
		if (userState.newGame)
			text = `Ruch ${userState.moves.length} gracza ${userState.playerTurn}`;
		if (userState.moves.length === 64)
			text = `Remis`;
		if (userState.moves.length < 64 && !userState.win)
			text = `Ruch ${userState.moves.length} gracza ${userState.playerTurn}`;
		if (userState.win)
			text = `Wygrał gracza ${userState.playerTurn === 'X' ? 'O' : 'X'}`;
	});

	const setBoard = (board: '2D' | '3D') => {
		userState.board = board;
	};

	const settingsLS = localStorage.getItem('settings');
	if (settingsLS)
		globalSettings.set(JSON.parse(settingsLS));

	let style = $state('');

	globalSettings.subscribe((settings) => {
		const settingsMap = Object.fromEntries(settings.map(setting => [setting.key, setting.value]));
		style = `
		--color-x: ${settingsMap['colorX']};
		--color-o: ${settingsMap['colorO']};
		--background-fields: ${settingsMap['backgroundFields']};
		--border-fields: ${settingsMap['borderFields']};
		--background-win: ${settingsMap['backgroundWin']};
		--color-highlight: ${settingsMap['colorHighlight']};
	`;
		localStorage.setItem('settings', JSON.stringify(settings));
	});


</script>

<div class="root" style={style}>
	<h1>{ text }</h1>
	<div class="select-board" style:--position-x_select-board-active="{userState.board === '2D' ? '-3%' : '53%'}">
		<button onclick="{() => setBoard('2D')}">Plansza 2D</button>
		<button onclick="{() => setBoard('3D')}">Plansza 3D</button>
	</div>
	<Game />
	<Menu />
	<Windows />
</div>
<style lang="less">
  .root {
    display: grid;
    grid-template-rows: 60px 40px auto max-content;
    height: 100%;
    justify-items: center;
    overflow-x: hidden;
    padding-bottom: 80px;

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
  }
</style>