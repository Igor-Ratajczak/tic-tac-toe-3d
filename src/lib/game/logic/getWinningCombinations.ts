/**
 * Directions for winning combinations in a 3D tic-tac-toe game.
 * - `start`: Starting positions for the lines.
 * - `move`: Step size to move to the next position in the line.
 */
const direction: Direction[] = [
	// Vertical lines on each board (e.g., Aa1 -> Ab1 -> Ac1 -> Ad1)
	{ start: [0, 1, 2, 3, 16, 17, 18, 19, 32, 33, 34, 35, 48, 49, 50, 51], move: 4 },
	// Horizontal lines on each board (e.g., Aa1 -> Aa2 -> Aa3 -> Aa4)
	{ start: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60], move: 1 },
	// Diagonals on each board (top-left to bottom-right, e.g., Aa1 -> Ab2 -> Ac3 -> Ad4)
	{ start: [0, 16, 32, 48], move: 5 },
	// Diagonals on each board (top-right to bottom-left, e.g., Aa4 -> Ab3 -> Ac2 -> Ad1)
	{ start: [3, 19, 35, 51], move: 3 },
	// Same position across boards (e.g., Aa1 -> Ba1 -> Ca1 -> Da1)
	{ start: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], move: 16 },
	// Horizontal lines spanning boards (e.g., Aa1 -> Ba2 -> Ca3 -> Da4)
	{ start: [0, 4, 8, 12], move: 17 },
	// Horizontal lines spanning boards (reverse, e.g., Aa4 -> Ba3 -> Ca2 -> Da1)
	{ start: [3, 7, 11, 15], move: 15 },
	// Diagonal spanning boards (top-left-front to bottom-right-back, e.g., Aa1 -> Bb2 -> Cc3 -> Dd4)
	{ start: [0], move: 21 },
	// Diagonal spanning boards (top-right-front to bottom-left-back, e.g., Aa4 -> Bb3 -> Cc2 -> Dd1)
	{ start: [3], move: 19 },
	// Diagonal spanning boards (bottom-left-front to top-right-back, e.g., Ad1 -> Bc2 -> Bb3 -> Da4)
	{ start: [12], move: 13 },
	// Diagonal spanning boards (bottom-right-front to top-left-back, e.g., Ad4 -> Bc3 -> Cb2 -> Da1)
	{ start: [15], move: 11 },
	// Vertical line spanning boards (e.g., Aa1 -> Bb1 -> Cc1 -> Dd1)
	{ start: [0, 1, 2, 3], move: 20 },
	// Vertical line spanning boards (e.g., Aa1 -> Bb1 -> Cc1 -> Dd1)
	{ start: [12, 13, 14, 15], move: 12 }
];

function createTable() {
	const table: { id: string }[] = [];
	const boardsNames = ['A', 'B', 'C', 'D'];
	let columns = ['1', '2', '3', '4'];
	let rows = ['a', 'b', 'c', 'd'];

	// Create id fields 0-63
	boardsNames.forEach(boardName => {
		rows.forEach(row => {
			columns.forEach(column => {
				table.push({
					id: boardName + row + column,
				});
			});
		});
	})
	return table;
}

/**
 * Function to create all winning combinations
 * @returns Returns all winning combinations
 */
export const getWinningCombinations = (): Array<string>[] => {
	const table = createTable()
	const winningCombinations: Array<string>[] = [];
		for (const dir of direction) {
			dir.start.forEach((start) => {
				const move = dir.move;
				const first = table[start].id
				const second = table[start + move].id
				const third = table[start + move * 2].id
				const fourth = table[start + move * 3].id
				winningCombinations.push([first, second, third, fourth]);
			});
		}
	// return all winning combinations
	return winningCombinations;
};
