<script lang="ts">
	import WindowContainer from '$lib/window/WindowContainer.svelte';
	import { t } from 'svelte-i18n';
	import { userState } from '$lib/state.svelte';

	let savedGames: SavedGame[] = $state(JSON.parse(localStorage.getItem('savedGames')!) || []);

	function loadGame(savedGame: SavedGame) {
		savedGame.state.window = false;
		savedGame.state.active_window = 'game';
		savedGame.state.isGameLoaded = true;
		savedGame.state.board = userState.board;
		Object.assign(userState, savedGame.state);
	}

	$effect(() => {
		userState.active_window;
		if (userState.active_window === 'loadGame')
			savedGames = JSON.parse(localStorage.getItem('savedGames')!) || [];
	});
</script>

<WindowContainer active_window="loadGame" window="small" In="fade" Out="blur">
	<div class="content loadGame">
		{#if savedGames.length > 0}
			{#each savedGames as savedGame, index}
				<div class="savedGame-container">
					<div role="button" class="game" tabindex="0" onclick={() => loadGame(savedGame)}
							 onkeyup={(e) => e.key ==="Enter" ? loadGame(savedGame) : null}>
						<div class="data">{savedGame.data}</div>
						<div class="title">{savedGame.title}</div>
					</div>
					<button class="remove" onclick={()=> savedGames.splice(index,index + 1)}>X</button>
				</div>
			{/each}
		{:else }
			<h3>{$t("noSavedGames")}</h3>
		{/if}
	</div>
</WindowContainer>

<style>
    .loadGame {
        font-size: 3em;
        overflow-y: auto;
        height: 100%;
        width: 90%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));

        .savedGame-container {
            width: 10em;
            height: 10em;
            background-color: black;
            display: grid;
            border-radius: 25px;
            grid-template-rows: 80% 20%;
            padding: 5px;

            .game {
                display: grid;
                grid-template-rows: 20% 80%;

                .data {
                    font-size: 0.6em;
                    text-align: center;
                }

                .title {
                    text-align: center;
                    align-content: center;
                }
            }

            .remove {
                padding: 0;
            }
        }

        h3 {
            grid-column: 1/3;
            place-self: center;
        }
    }
</style>