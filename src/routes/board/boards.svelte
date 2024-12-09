<script lang="ts">
	import { userState } from '../state.svelte.js';
	import Board from './board.svelte';

	window.addEventListener('click', () => {
		const board = Array.from(
			document.querySelectorAll('.boards .rect')
		).map((rect) => rect.innerHTML);
		console.log(board);
	});


</script>

<div class="boards">
	{#each userState.boards as board}
		<div class="board-container">
			<p>{board.id}</p>
			<Board id="{board.id}" moves={board.moves} />
		</div>
	{/each}
</div>

<style>
    .boards {
        grid-row: 3;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        grid-auto-rows: minmax(320px, auto);
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