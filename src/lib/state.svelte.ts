export const userState: UserState = $state({
	moves: [
		{
			id: 'Aa1',
			text: 'X'
		}
	],
	newGame: false,
	opponent: null,
	playerTurn: 'X',
	move: 0,
	board: '2D',
	botDifficulty: 'easy'
});

import { writable } from 'svelte/store';

export const moves = writable<{ [id:string]: string }>(
	{
		"Aa1": 'X',
		"Aa2": 'O'
	}
);