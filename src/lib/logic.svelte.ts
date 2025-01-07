import { userState } from '$lib/state.svelte';

export function newGame(playerTurn: 'X' | 'O', level?: BotLevels) {
	if (level) {
		userState.botDifficulty = level;
		userState.opponent = 'bot';
	} else {
		userState.opponent = 'player';
	}
	localStorage.removeItem('temporaryHistory');
	userState.isGameLoaded = false;
	userState.playerTurn = playerTurn;
	userState.window = false;
	userState.active_window = 'game';
	userState.win = false;
	userState.moves = [];
	userState.winningFields = [];
	userState.move = 0;
	userState.newGame = true;
}
