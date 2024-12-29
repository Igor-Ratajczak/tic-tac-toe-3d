export const userState: UserState = $state({
	moves: [],
	isGameLoaded: false,
	newGame: false,
	opponent: null,
	playerTurn: 'X',
	symbolBot: 'X',
	move: 0,
	board: '2D',
	botDifficulty: 'easy',
	win: false,
	winningFields: [],
	window: false,
	active_window: 'game'
});

export const globalSettings: Settings[] = $state([
	{ key: 'colorX', value: '#ff0000', defaultValue: '#ff0000' },
	{ key: 'colorO', value: '#0000ff', defaultValue: '#0000ff' },
	{ key: 'backgroundFields', value: '#ffffff', defaultValue: '#ffffff' },
	{ key: 'borderFields', value: '#000000', defaultValue: '#000000' },
	{
		key: 'backgroundWin',
		value: '#008000',
		defaultValue: '#008000'
	},
	{
		key: 'colorHighlight',
		value: '#ff0000',
		defaultValue: '#ff0000'
	}
]);