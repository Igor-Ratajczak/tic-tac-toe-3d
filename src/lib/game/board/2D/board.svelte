<script lang="ts">
	import { setNewMove } from '$lib/game/board/logic.svelte.js';
	import { userState } from '$lib/state.svelte.js';

	let props: { board: Board[] } = $props();

	let lastMove = $derived(userState.moves[userState.moves.length - 1]?.id);

</script>

<div class="board">
	{#each props.board as field}
		<button
			id={field.id}
			class="rect
				{field.text === 'X' ? 'X' : 'O'}
				{lastMove === field.id ? 'highlight' : null}
				{userState.winningFields.includes(field.id) ? `winning-field` : null}"
			onclick={() => userState.newGame && !userState.win && field.text === '' ? setNewMove(field.id) : null}
			tabindex="-1"
			disabled="{!!field.text }">
			{ field.text  }
		</button>
	{/each}
</div>


<style lang="less">
  .board {
    grid-row: 2;
    display: grid;
    grid-template-columns: repeat(4, 60px);
    grid-template-rows: repeat(4, 60px);
    border: 1px solid var(--border-fields);
    aspect-ratio: 1;
    width: calc(60px * 4);
    height: calc(60px * 4);

    button {
      border: 1px solid var(--border-fields);
      cursor: pointer;
      text-align: center;
      align-content: center;
      font-size: 3em;
      background: var(--background-fields);
      color: black;

      @media screen and (min-width: 772px) {
        &:hover {
          background-color: var(--color-highlight);
        }
      }

      &.highlight {
        position: relative;
        background: var(--background-fields);

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        &:is(&.X) {
          box-shadow: inset 0 0 10px 5px var(--color-x);

          &::after {
            box-shadow: 0 0 10px 5px var(--color-x);
          }
        }

        &:is(&.O) {
          box-shadow: inset 0 0 10px 5px var(--color-o);

          &::after {
            box-shadow: 0 0 10px 5px var(--color-o);
          }
        }
      }

      &.winning-field.winning-field.winning-field.winning-field.winning-field {
        box-shadow: inset 0 0 10px 5px var(--background-win);
        position: relative;
        background: var(--background-fields);

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: 0 0 10px 10px var(--background-win);
        }
      }


      &:focus {
        outline: 5px solid green;
        z-index: 10;
      }

      &.X {
        color: var(--color-x);
      }

      &.O {
        color: var(--color-o);
      }
    }
  }
</style>