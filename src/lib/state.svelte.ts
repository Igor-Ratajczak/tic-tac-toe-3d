export const userState: UserState = $state({
	moves: [],
	newGame: false,
	opponent: null,
	playerTurn: 'X',
	move: 0,
	board: '2D',
	botDifficulty: 'easy',
	win: false,
	winningFields: [],
	window: false,
	active_window: 'game'
});

import { writable } from 'svelte/store';

export let globalSettings = writable<Settings[]>([
	{ key: 'colorX', name: 'Kolor X', value: '#ff0000', defaultValue: '#ff0000' },
	{ key: 'colorO', name: 'Kolor O', value: '#0000ff', defaultValue: '#0000ff' },
	{ key: 'backgroundFields', name: 'Tło pól', value: '#ffffff', defaultValue: '#ffffff' },
	{ key: 'borderFields', name: 'Obramowanie pól', value: '#000000', defaultValue: '#000000' },
	{
		key: 'backgroundWin',
		name: 'Tło pól wygrywających',
		value: '#008000',
		defaultValue: '#008000'
	},
	{
		key: 'colorHighlight',
		name: 'Kolor ostatniego ruchu',
		value: '#ff0000',
		defaultValue: '#ff0000'
	}
]);
