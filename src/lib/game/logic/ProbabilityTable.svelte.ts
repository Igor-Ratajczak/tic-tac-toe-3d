import { getWinningCombinations } from '$lib/game/logic/getWinningCombinations';

export function getMovesForCombination(
	combination: string[],
	moves: { id: string; text: string }[]
): { id: string; text: string }[] {
	return moves.filter((move) => combination.includes(move.id));
}

export function createProbabilityWinTable(moves: Move[]) {
	const table: ProbabilityWinTable[] = [];
	for (const combination of getWinningCombinations()) {
		const probabilityWinMoves = getMovesForCombination(combination, moves);
		if (probabilityWinMoves.length > 0) {
			if (probabilityWinMoves.every((move) => move.text === probabilityWinMoves[0].text)) {
				const played = probabilityWinMoves.map((move) => move.id);
				const notPlayed = combination.filter((move) => !played.includes(move));
				table.push({
					played: played,
					notPlayed: notPlayed,
					turn: probabilityWinMoves[0].text,
					priority: notPlayed.length
				});
			}
		}
	}
	table.sort((a, b) => a.priority - b.priority);
	return table;
}
