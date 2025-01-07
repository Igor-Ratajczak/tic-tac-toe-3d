<script lang="ts">
	import WindowContainer from '$lib/window/WindowContainer.svelte';
	import { t } from 'svelte-i18n';
	import { userState } from '$lib/state.svelte';

	let allHistory: GameHistory[] = $state(JSON.parse(localStorage.getItem('tic-tac-toe-3d_history')!) || []);
	let groupedHistory: { date: string; games: GameHistory[] }[] = $state([]);
	let active = $state('');

	$effect(() => {
		userState.active_window;
		if (userState.active_window === 'history')
			allHistory = JSON.parse(localStorage.getItem('tic-tac-toe-3d_history')!) || [];
	});


	$effect(() => {
		allHistory;
		let reduceHistory = allHistory.reduce((accumulator, history) => {
			const date = history.time.slice(0, 10);

			if (!accumulator[date]) {
				accumulator[date] = [];
			}
			accumulator[date].push(history);

			return accumulator;
		}, {} as Record<string, GameHistory[]>);


		groupedHistory = Object.entries(reduceHistory).map(([date, games]) => ({ date, games }));
	});

	function PreviewHistoryGame(history: GameHistory) {
		userState.moves = history.moves;
		userState.opponent = history.opponent;
		userState.botDifficulty = history.botDifficulty;
		userState.isGameLoaded = true;
		userState.window = false;
		userState.active_window = 'game';
	}

	function removeHistory() {
		localStorage.removeItem('tic-tac-toe-3d_history');
		allHistory = [];
		groupedHistory = [];
	}
</script>

<WindowContainer active_window="history" window="large" In="scale-from-side" Out="blur">
	<div class="content allHistory">
		{#if groupedHistory.length > 0}
			<button class="remove" onclick={() => removeHistory()}>{$t("history.remove")}</button>
			{#each groupedHistory as { date, games }}
				<div class="groupedHistory">
					<button onclick={()=> active === date ? active = "" : active = date}>{date}</button>
					<ul class:active={active === date}>
						{#each games as history}
							<li class="history">
								<div class="time">{history.time.slice(12)}</div>
								<div class="moves">
									<b>{$t("history.moves")}</b>
									<p>{history.moves.length}</p>
								</div>
								<div class="opponent">
									<b>{$t("history.opponent")}</b>
									<p>{history.opponent}</p>
								</div>
								{#if history.opponent === 'bot'}
									<div class="difficulty">
										<b>{$t("history.botDifficulty")}</b>
										<p>{history.botDifficulty}</p>
									</div>
								{/if}
								<button class="preview" onclick={() => PreviewHistoryGame(history)}>
									{$t("history.preview")}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		{:else}
			<h3>{$t("history.noHistory")}</h3>
		{/if}
	</div>
</WindowContainer>

<style lang="less">
  .allHistory {
    font-size: 3em;
    height: 100%;
    overflow: auto;
    width: 100%;
    align-self: baseline;
    align-content: baseline;

    .remove {
      width: max-content;
      justify-self: center;
    }

    &:not(:has(.groupedHistory)) {
      align-self: center;
      align-content: center;
      justify-content: center;
    }

    .groupedHistory {
      display: grid;
      grid-template-rows: max-content max-content;
      padding: 1em;
      width: 100%;

      > button {
        font-size: 1.5em;
        font-weight: bolder;
      }

      ul {
        margin-left: 1em;
        list-style: none;
        padding: 0;
        height: 0;
        overflow: hidden;
        transition: height 0.5s ease;
        display: grid;
        grid-template-columns: repeat(auto-fill, 90%);
        justify-content: center;
        gap: 2em;

        @media screen and (min-width: 850px) {
          grid-template-columns: repeat(auto-fill, 40%);
        }

        @media screen and (min-width: 1200px) {
          grid-template-columns: repeat(auto-fill, 30%);
        }

        &.active {
          height: auto;
        }

        li.history {
          margin: 0.5em 0;
          padding: 0.5em;
          border: 1px solid #ccc;
          border-radius: 15px;
          background-color: #000000;
          display: grid;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
          align-items: center;
          justify-items: center;

          .time {
            font-weight: bolder;
            font-size: 1.2em;
          }

          > div {
            display: flex;
            gap: 20px;
          }

          .preview {
            grid-row: 5
          }
        }
      }
    }

    h3 {
      text-align: center;
      height: 100%;
      align-self: center;
    }
  }
</style>