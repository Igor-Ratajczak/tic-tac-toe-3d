import { userState } from '$lib/state.svelte';

export const setAllMoves = (boards: Boards[] | Board3D[]) => {
	boards.forEach((board) => {
		board.board.forEach((field) => {
			userState.moves.forEach((move) => {
				if (move.id === field.id) {
					field.text = move.text;
				}
			});
		});
	});
};

export const getTabIndex = (id: string, index: number): number => {
	const subtract = id === 'A' ? 0 : id === 'B' ? 16 : id === 'C' ? 32 : 48;
	return index + subtract;
};

export const setNewMove = (field: Board | Box) => {
	if (field.text !== '') return;
	field.text = userState.playerTurn;
	userState.moves.push({
		id: field.id,
		text: userState.playerTurn
	});
	userState.playerTurn = userState.playerTurn === 'O' ? 'X' : 'O';
	userState.move++;
};

export const isLastMove = (id: string): boolean => {
	return userState.moves[userState.moves.length - 1].id === id;
};
