export const userState = $state({
	boards: [
		{
			id: 'A',
			moves: []
		},
		{
			id: 'B',
			moves: []
		},
		{
			id: 'C',
			moves: []
		},
		{
			id: 'D',
			moves: []
		}
	],
	opponent: null,
	tour: 'X',
	move: 0,
	board: '2D'
});
