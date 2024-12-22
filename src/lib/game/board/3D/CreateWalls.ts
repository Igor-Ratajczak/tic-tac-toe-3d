// Settings walls
export const wallData: Wall[] = [
	{ x: 0, y: 2, z: 2, rotation: [0, Math.PI, Math.PI], id: 'A' }, // Front
	{ x: 2, y: 2, z: 0, rotation: [0, -Math.PI / 2, Math.PI], id: 'B' }, // Right
	{ x: 0, y: 2, z: -2, rotation: [0, 0, Math.PI], id: 'C' }, // Back
	{ x: -2, y: 2, z: 0, rotation: [0, Math.PI / 2, Math.PI], id: 'D' } // Left
];

export const createWall = (id: string) => {
	const board: Box[] = [];
	const lines: Line[] = [];

	let columns = ['1', '2', '3', '4'];
	let rows = ['a', 'b', 'c', 'd'];

	// Create 16 fields 4x4
	rows.forEach((row, r) => {
		columns.forEach((column, c) => {
			board.push({
				id: id + row + column,
				x: c - 1.5,
				y: r + 0.5,
				z: 0,
				color: 'white',
				text: ''
			});
		});
	});
	for (let i = 1; i < 6; i++) {
		// lines horizontals
		lines.push({
			x: 0,
			y: i - 1,
			z: -0.1,
			w: 4,
			h: 0.1
		});
		// lines verticals
		lines.push({
			x: i - 3,
			y: 2,
			z: -0.1,
			w: 0.1,
			h: 4
		});
	}

	return { board, lines };
};

// Create 4 walls
export let walls: Board3D[] = wallData.map((wall) => ({
	...wall,
	...createWall(wall.id)
}));
