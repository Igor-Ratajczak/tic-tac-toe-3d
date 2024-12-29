<script lang="ts">
	import WindowContainer from '$lib/window/WindowContainer.svelte';
	import { newGame } from '$lib/logic.svelte';
	import { userState } from '$lib/state.svelte';
	import { t } from 'svelte-i18n';

	let playerTurn: 'X' | 'O' = $state(userState.playerTurn);

</script>

<WindowContainer active_window="newGameFriend" window="small" In="fade" Out="blur">
	<div class="content newGame">
		<div class="first-player">
			<b>{$t("newGame.firstPlayer")}</b>
			<div>
				<input type="checkbox" id="X" name="X" checked={playerTurn === "X"}
							 onclick={() => playerTurn = "X"} />
				<label for="X">X</label>
			</div>
			<div>
				<input type="checkbox" id="O" name="O" checked={playerTurn === "O"}
							 onclick={() => playerTurn = "O"} />
				<label for="O">O</label>
			</div>
		</div>
		<button class="play" onclick={() => newGame(playerTurn)}>{$t("newGame.play")}</button>
	</div>
</WindowContainer>

<style lang="less">
  .newGame {
    width: 100%;
    height: 100%;
    overflow: hidden;
    place-items: center;
    grid-template-rows: 1fr 1fr;
  }
</style>
