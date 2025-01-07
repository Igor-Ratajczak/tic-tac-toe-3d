<script lang="ts">
	import WindowContainer from '$lib/window/WindowContainer.svelte';
	import { t } from 'svelte-i18n';
	import { userState } from '$lib/state.svelte';

	let title = $state('');

	function saveGame() {
		let savedGames: SavedGame[] = [];
		let savedGamesLS = localStorage.getItem('tic-tac-toe-3d_savedGames');
		if (savedGamesLS) {
			savedGames = JSON.parse(savedGamesLS);
		}
		savedGames.push({
			title: title,
			data: new Date().toLocaleString(),
			state: {
				...userState
			}
		});
		localStorage.setItem('tic-tac-toe-3d_savedGames', JSON.stringify(savedGames));
		userState.window = false;
		userState.active_window = 'game';
	}
</script>

<WindowContainer active_window="saveGame" window="small" In="fade" Out="blur">
	<div class="content saveGame">
		{#if userState.newGame}
			<input type="text" name="saveGame" id="saveGame" placeholder={$t("saveGame.input")} bind:value={title} />
			<button class="save" onclick={() => saveGame()}>{$t("saveGame.button")}</button>
		{:else}  <h2>{$t("saveGame.notToSave")}</h2>
		{/if}
	</div>
</WindowContainer>

<style>
    .saveGame {
        font-size: 3em;

        h2 {
            text-align: center;
            padding: 2em;
        }
    }
</style>