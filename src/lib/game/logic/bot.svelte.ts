import { userState } from '$lib/state.svelte.js';
import { checkWin } from '$lib/game/board/logic.svelte';
import { getBestMove } from '$lib/game/logic/getBestMove.svelte';
import { createProbabilityWinTable } from '$lib/game/logic/ProbabilityTable.svelte';

export function bot() {
	if (userState.moves.length === 64) return;

	const ProbabilityWinTable = createProbabilityWinTable(userState.moves);
	let move;
	if (userState.moves.length === 0) {
		move = getFirstMove();
	} else {
		if (ProbabilityWinTable.length > 0) {
			const probabilityRandomMove = Math.random() * 100;
			const randomMove = Number((Math.random() * (ProbabilityWinTable.length - 1)).toFixed(0));
			const MinRandom =
				userState.botDifficulty === 'easy' ? 20 : userState.botDifficulty === 'medium' ? 8 : 0;

			if (probabilityRandomMove > MinRandom) {
				move = getBestMove(ProbabilityWinTable);
			} else {
				move = ProbabilityWinTable[randomMove].notPlayed[0];
			}
		} else {
			move = getRandomMove(userState.moves);
		}
	}
	userState.moves.push({
		id: move,
		text: userState.playerTurn
	});
	userState.playerTurn = userState.playerTurn === 'X' ? 'O' : 'X';
	localStorage.setItem('tic-tac-toe-3d_temporaryHistory', JSON.stringify(userState));
	checkWin(userState.moves);
}

function getFirstMove(): string {
	const firstBestMoves = [
		'Aa1',
		'Aa4',
		'Ad1',
		'Ad4',
		'Bb2',
		'Bb3',
		'Bc2',
		'Bc3',
		'Cb2',
		'Cb3',
		'Cc2',
		'Cc3',
		'Da1',
		'Da4',
		'Dd1',
		'Dd4'
	];

	return firstBestMoves[Math.floor(Math.random() * firstBestMoves.length)];
}

function getRandomMove(moves: Move[]): string {
	const boardsNames = ['A', 'B', 'C', 'D'];
	let rows = ['a', 'b', 'c', 'd'];
	let columns = ['1', '2', '3', '4'];

	let AllMoves: string[] = [];
	boardsNames.forEach((name) => {
		rows.forEach((row) => {
			columns.forEach((column) => {
				AllMoves.push(name + row + column);
			});
		});
	});
	const randomMoves: string[] = [];
	const NewMoves = moves.map((move) => move.id);
	AllMoves.filter((move) => {
		if (!NewMoves.includes(move)) {
			randomMoves.push(move);
		}
	});

	return randomMoves[Math.floor(Math.random() * randomMoves.length)];
}
