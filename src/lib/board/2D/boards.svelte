<script lang="ts">
	import Board from './board.svelte';
	import { setAllMoves } from '$lib/board/logic.svelte.js';


	const boardsNames = ['A', 'B', 'C', 'D'];
	let columns = ['1', '2', '3', '4'];
	let rows = ['a', 'b', 'c', 'd'];

	const boards = $state<Boards[]>([]);

	boardsNames.forEach(boardName => {
		let board: Board[] = [];
		rows.forEach(row => {
			columns.forEach(column => {
				board.push({
					id: boardName + row + column,
					text: ''
				});
			});
		});
		boards.push({
			name: boardName,
			board: board
		});
	});

	setAllMoves(boards);

</script>

{#if boards.length > 0}
	<div class="boards">
		{#each boards as board}
			<div class="board-container">
				<p>{board.name}</p>
				<Board board={board.board} />
			</div>
		{/each}
	</div>
{:else}
	<div class="error">
		Błąd
	</div>
{/if}

<style>
    .boards {
        grid-row: 3;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-auto-rows: minmax(250px, 1fr);
        gap: 2em;
        text-align: center;
        width: 100vw;
        justify-items: center;
        padding: 2em;

        p {
            font-size: 30px;
        }
    }
</style>