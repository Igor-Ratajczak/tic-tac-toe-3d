import { userState } from '$lib/state.svelte.js';
import { getWinningCombinations } from '$lib/game/logic/getWinningCombinations';
import { getMovesForCombination } from '$lib/game/logic/ProbabilityTable.svelte';

export const setAllMoves = (boards: Boards[] | Board3D[]) => {
	const moves = userState.moves;
	boards.forEach((board) => {
		board.board.forEach((field) => {
			moves.forEach((move) => {
				if (move.id === field.id) {
					field.text = move.text;
				}
			});
		});
	});
};

export const setNewMove = (fieldID: string) => {
	const moves = userState.moves;
	moves.push({
		id: fieldID,
		text: userState.playerTurn
	});
	userState.playerTurn = userState.playerTurn === 'O' ? 'X' : 'O';
	userState.move++;
	localStorage.setItem('temporaryHistory', JSON.stringify(userState));
	checkWin(userState.moves);
};

export const isLastMove = (id: string): boolean => {
	const moves = userState.moves;
	return moves[moves.length - 1].id === id;
};

export const checkWin = (moves: Move[]) => {
	if (moves.length === 63) {
		userState.newGame = false;
		localStorage.setItem('temporaryHistory', 'null');
	} else {
		for (const combination of getWinningCombinations()) {
			const [a, b, c, d] = combination;
			const probabilityWinMoves = getMovesForCombination(combination, moves);
			if (
				probabilityWinMoves.length === 4 &&
				probabilityWinMoves.every((move) => move.text === probabilityWinMoves[0].text)
			) {
				userState.win = true;
				userState.winningFields = [a, b, c, d];
				userState.newGame = false;
				localStorage.setItem('temporaryHistory', 'null');
			}
		}
	}
};
