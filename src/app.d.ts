// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
/// <reference types="vite-plugin-pwa/client" />
declare global {
	interface GameHistory {
		time: string;
		moves: Move[];
		opponent: 'player' | 'bot';
		botDifficulty: 'easy' | 'medium' | 'hard';
	}

	interface SavedGame {
		title: string;
		data: string;
		state: UserState;
	}

	interface Settings {
		key: SettingsKeys;
		value: string;
		defaultValue: string;
	}

	type BotLevels = 'easy' | 'medium' | 'hard';

	type SettingsKeys =
		| 'colorX'
		| 'colorO'
		| 'backgroundFields'
		| 'borderFields'
		| 'backgroundWin'
		| 'colorHighlight';

	interface UserState {
		isGameLoaded: boolean;
		newGame: boolean;
		opponent: 'player' | 'bot' | null;
		playerTurn: 'X' | 'O';
		symbolBot: 'X' | 'O';
		move: number;
		board: '2D' | '3D';
		botDifficulty: 'easy' | 'medium' | 'hard';
		moves: Move[];
		win: boolean;
		winningFields: Array<string>;
		window: boolean;
		active_window: string;
	}

	interface Boards {
		name: string;
		board: Board[];
	}

	interface Board {
		id: string;
		text: string;
	}

	interface Move {
		id: string;
		text: string;
	}

	interface Direction {
		start: number[];
		move: number;
	}

	interface Box {
		id: string;
		x: number;
		y: number;
		z: number;
		color: string;
		text: string;
	}

	interface Line {
		x: number;
		y: number;
		z: number;
		w: number;
		h: number;
	}

	interface Wall {
		id: string;
		x: number;
		y: number;
		z: number;
		rotation:
			| number
			| [x: number, y: number, z: number, order?: EulerOrder | undefined]
			| undefined;
	}

	interface Board3D extends Wall {
		board: Box[];
		lines: Line[];
	}

	interface ProbabilityWinTable {
		played: string[];
		notPlayed: string[];
		turn: string;
		priority: number;
	}

	interface RepeatMoves {
		move: string;
		repeat: number;
	}
}

export {};
