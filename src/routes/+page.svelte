<script lang="ts">
	import Menu from '$lib/menu/menu.svelte';
	import { globalSettings, userState } from '$lib/state.svelte.js';
	import Windows from '$lib/window/Windows.svelte';
	import Game from '$lib/game/Game.svelte';
	import { t, locale } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import WelcomeScreen from '$lib/WelcomeScreen.svelte';

	let text = $state('');
	let move = $state($t('move'));
	let win = $state($t('win'));
	let draw = $state($t('draw'));
	let player = $state($t('player'));

	$effect(() => {
		if (userState.newGame)
			text = `${move} ${userState.moves.length} ${player} ${userState.playerTurn}`;
		if (userState.moves.length === 64)
			text = draw;
		if (userState.moves.length < 64 && userState.moves.length > 0 && !userState.win)
			text = `${move} ${userState.moves.length} ${player} ${userState.playerTurn}`;
		if (userState.win)
			text = `${win} ${userState.playerTurn === 'X' ? 'O' : 'X'}`;
	});

	locale.subscribe(() => {
		move = $t('move');
		win = $t('win');
		draw = $t('draw');
		player = $t('player');
	});

	const setBoard = (board: '2D' | '3D') => {
		userState.board = board;
	};

	onMount(() => {
		// load settings from local storage and update global settings
		const settingsLS = JSON.parse(localStorage.getItem('settings')!);
		if (settingsLS && settingsLS.length > 0)
			Object.assign(globalSettings, settingsLS);

		// load lang from local storage and set
		const langLS: string = localStorage.getItem('lang') ?? navigator.language;

		if (langLS) {
			locale.set(langLS);
		}
	});

	let style = $state('');

	$effect(() => {
		globalSettings;
		const settingsMap = Object.fromEntries(globalSettings.map(setting => [setting.key, setting.value]));
		style = `
		--color-x: ${settingsMap['colorX']};
		--color-o: ${settingsMap['colorO']};
		--background-fields: ${settingsMap['backgroundFields']};
		--border-fields: ${settingsMap['borderFields']};
		--background-win: ${settingsMap['backgroundWin']};
		--color-highlight: ${settingsMap['colorHighlight']};
	`;
		localStorage.setItem('settings', JSON.stringify(globalSettings));
	});


</script>

<div class="root" style={style}>
	<WelcomeScreen />
	<h1>{ text === "" ? $t('hello') : text}</h1>
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
      font-size: 2.8em;
      align-content: center;
      padding-right: 5em;
      text-align: center;

      @media screen and (min-width: 772px) {
        padding: 0;
      }
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