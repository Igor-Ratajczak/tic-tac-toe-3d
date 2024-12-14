import { userState } from '$lib/state.svelte';
import { getWinningCombinations } from '$lib/logic/getWinningCombinations';

export const setAllMoves = (boards: Boards[] | Board3D[]) => {
	const moves = userState.moves
	console.log(boards);
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

export const getTabIndex = (id: string, index: number): number => {
	const subtract = id === 'A' ? 0 : id === 'B' ? 16 : id === 'C' ? 32 : 48;
	return index + subtract;
};

export const setNewMove = (field: Board | Box) => {
	const moves = userState.moves;
	if (field.text !== '') return;
	field.text = userState.playerTurn;
	moves.push({
		id: field.id,
		text: userState.playerTurn
	});
	userState.playerTurn = userState.playerTurn === 'O' ? 'X' : 'O';
	userState.move++;
	checkWin();
};

export const isLastMove = (id: string): boolean => {
	const moves = userState.moves;
	return moves[moves.length - 1].id === id;
};

const checkWin = () => {
	const moves = userState.moves;
	const winningCombinations = getWinningCombinations();

	for (const combination of winningCombinations) {
		const [a, b, c, d] = combination;
		const probabilityWinMoves: { id: string; text: string }[] = [];
		moves.forEach((move) => {
			if (a === move.id || b === move.id || c === move.id || d === move.id) {
				probabilityWinMoves.push({
					id: move.id,
					text: move.text
				});
			}
		});
		if (
			probabilityWinMoves.length === 4 &&
			probabilityWinMoves.every((move) => move.text === probabilityWinMoves[0].text) &&
			a === probabilityWinMoves[0].id &&
			b === probabilityWinMoves[1].id &&
			c === probabilityWinMoves[2].id &&
			d === probabilityWinMoves[3].id
		) {
			userState.win = true;
			userState.winningFields = [a, b, c, d];
			console.log(combination);
			return;
		}
	}
};
