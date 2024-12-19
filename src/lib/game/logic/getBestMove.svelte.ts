import { userState } from '$lib/state.svelte';
import { createProbabilityWinTable } from '$lib/game/logic/ProbabilityTable.svelte';

export function getBestMove(ProbabilityWinTable: ProbabilityWinTable[]): string {
	const priority1 = ProbabilityWinTable.filter((move) => move.priority === 1);
	const priority2 = ProbabilityWinTable.filter((move) => move.priority === 2);
	const priority3 = ProbabilityWinTable.filter((move) => move.priority === 3);

	if (priority1.length > 0) {
		return ProbabilityWinTable[0].notPlayed[0];
	} else if (priority2.length > 0) {
		const moves = priority2.map((move) => move.notPlayed).flat(1);
		return findBestMove(moves, priority2, [...userState.moves]);
	} else {
		const moves = priority3.map((move) => move.notPlayed).flat(1);
		return findBestMove(moves, priority3, [...userState.moves]);
	}
}

function findBestMove(
	moves: string[],
	priorityMoves: ProbabilityWinTable[],
	board: Move[]
): string {
	const repeatMoves: RepeatMoves[] = [];
	const allMoves = priorityMoves.map((move) => move.notPlayed).flat(1);

	moves.sort();
	moves.forEach((move, index) => {
		if (move === moves[index + 1]) {
			const existing = repeatMoves.find((m) => m.move === move);
			if (existing) {
				existing.repeat++;
			} else {
				repeatMoves.push({ move, repeat: 2 });
			}
		}
	});

	repeatMoves.sort((a, b) => b.repeat - a.repeat);
	const filteredMoves = repeatMoves.filter((move) => move.repeat === repeatMoves[0]?.repeat);

	if (filteredMoves.length > 0) {
		let bestScore = -Infinity;
		let bestMove = filteredMoves[0].move;
		filteredMoves.forEach((move) => {
			board.push({ id: move.move, text: userState.playerTurn === 'X' ? 'O' : 'X' });
			const score = evaluateMove(board, move.move);
			board.pop();

			if (score > bestScore) {
				bestMove = move.move;
				bestScore = score;
			}
		});
		return bestMove;
	}
	return allMoves[Math.floor(Math.random() * allMoves.length)] || 'defaultMove';
}

function evaluateMove(Moves: Move[], move: string) {
	const ProbabilityWinTable = createProbabilityWinTable(Moves);

	const priority1 = ProbabilityWinTable.filter((move) => move.priority === 1);
	const priority2 = ProbabilityWinTable.filter((move) => move.priority === 2);
	const priority3 = ProbabilityWinTable.filter((move) => move.priority === 3);
	const moves2 = priority2.map((move) => move.played).flat(1);
	const moves3 = priority3.map((move) => move.played).flat(1);
	const includesMove2 = moves2.filter((move2) => move2 === move);
	const includesMove3 = moves3.filter((move3) => move3 === move);
	return priority1.length + includesMove2.length + includesMove3.length;
}
