// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface UserState {
		newGame: boolean;
		opponent: string | null;
		playerTurn: string;
		move: number;
		board: string;
		botDifficulty: string;
		moves: Move[];
	}

	interface Boards {
		name: string;
		board: Board[]
	}

	interface Board {
		id: string,
		text: string
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

	interface Board3D extends Wall{
		board: Box[];
		lines: Line[];
	}
}

export {};
