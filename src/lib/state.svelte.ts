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

export const settings = writable<Settings[]>([]);
