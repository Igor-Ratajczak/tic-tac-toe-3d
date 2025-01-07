<script lang="ts">
	import WindowContainer from '$lib/window/WindowContainer.svelte';
	import { newGame } from '$lib/logic.svelte';
	import { userState } from '$lib/state.svelte';
	import { t } from 'svelte-i18n';


	let botLevel: BotLevels = $state('easy');
	let playerTurn: 'X' | 'O' = $state(userState.playerTurn === 'X' ? 'O' : 'X');

	$effect(() => {
		userState.win;
		if (userState.win === true)
			playerTurn = userState.playerTurn;
	});

</script>

<WindowContainer active_window="newGameBot" window="small" In="fade" Out="blur">
	<div class="content newGame">
		<div class="level">
			<label for="bot-level">{$t("newGame.level.label")}</label>
			<select id="bot-level" name="bot-levels" bind:value={botLevel}>
				<option value="easy">{$t("newGame.level.easy")}</option>
				<option value="medium">{$t("newGame.level.medium")}</option>
				<option value="hard">{$t("newGame.level.hard")}</option>
			</select>
		</div>
		<div class="info">{$t(`newGame.levelInfo.${botLevel}`)}</div>
		<div class="symbol-bot">
			<b>{$t("newGame.symbolBot")}</b>
			<div>
				<input type="checkbox" id="symbol-botX" name="X" checked={userState.symbolBot === "X"}
							 onclick={() => userState.symbolBot = "X"} />
				<label for="symbol-botX">X</label>
			</div>
			<div>
				<input type="checkbox" id="symbol-botO" name="O" checked={userState.symbolBot === "O"}
							 onclick={() => userState.symbolBot = "O"} />
				<label for="symbol-botO">O</label>
			</div>
		</div>
		<div class="first-player">
			<b>{$t("newGame.firstPlayer")}</b>
			<div>
				<input type="checkbox" id="first-playerX" name="X" checked={playerTurn === "X"}
							 onclick={() => playerTurn = "X"} />
				<label for="first-playerX">X</label>
			</div>
			<div>
				<input type="checkbox" id="first-playerO" name="O" checked={playerTurn === "O"}
							 onclick={() => playerTurn = "O"} />
				<label for="first-playerO">O</label>
			</div>
		</div>
		<button class="play" onclick={() => newGame(playerTurn, botLevel)}>{$t("newGame.play")}</button>
	</div>
</WindowContainer>


<style lang="less">
  .newGame {
    width: 100%;
    height: 100%;
    overflow: hidden;
    place-items: center;
    grid-template-rows: 1fr 2fr 2fr 2fr 4fr;
    gap: 20px;

    .level {
      grid-row: 1;
      display: grid;
      justify-items: center;
      align-items: center;
      gap: 10px;

      @media (min-width: 1000px) {
        display: flex;
        gap: 10px;
      }
      @media (max-height: 500px) {
        display: flex;
        gap: 10px;
      }

      select {
        width: 5em;
        height: 2em;
        font-size: 1.2em;
        background-color: black;
        border-radius: 15px;
        text-align: center;
      }
    }

    .info {
      grid-row: 2;
      background: black;
      border-radius: 15px;
      border: 2px solid grey;
      text-align: center;
      width: 90%;
      align-content: center;
      height: 100%;
      padding: 10px;
      font-size: 1em;
    }

    .symbol-bot {
      grid-row: 3;
    }

    .first-player {
      grid-row: 4;
    }
  }
</style>
