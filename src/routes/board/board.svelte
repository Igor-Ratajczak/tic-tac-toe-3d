<script lang="ts">
	import { userState } from '../state.svelte.js';
	let props = $props();

	let width = ['1', '2', '3', '4'];
	let height = ['a', 'b', 'c', 'd'];

	const getText = (width: string, height: string) => {
		let text = '';
		props.moves.filter((move: Move) => {
			if (move.id === (width + '' + height)) {
				text = move.text;
			}
		});
		return text;
	};
	const changeTour = (w: string, h: string) => {
		userState.boards.filter((board) => {
		if(board.id === props.id){
			board.moves.push({
				id: w + h,
				text: userState.tour
			});
		}
		})
		userState.tour = userState.tour === 'O' ? 'X' : 'O';
		userState.move++

	};
</script>

<div class="board">
	{#each height as h, i}
		{#each width as w}
			<button class="{getText(w, h) === '' ? '' : getText(w, h) === 'X' ? 'x' : 'o'} rect"
							onclick={() => changeTour(w,h)}
							tabindex="{Number(w+i)}"
							disabled="{!!getText(w, h) }">
				{ getText(w, h) || w+h  }
			</button>
		{/each}
	{/each}
</div>


<style>
    .board {
				grid-row: 2;
        display: grid;
        grid-template-columns: repeat(4, 5em);
        grid-template-rows: repeat(4, 5em);
        border: 1px solid black;
        aspect-ratio: 1;
        width: 20em;
        height: 20em;
				background: var(--background-board);

        button {
            border: 1px solid black;
            cursor: pointer;
            text-align: center;
            align-content: center;
            font-size: 25px;
						color: black;

						&.x {
							color: red;
						}
            &.o {
                color: blue;
            }
        }
    }
</style>