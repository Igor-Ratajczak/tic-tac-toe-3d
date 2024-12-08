<script lang="ts">
	import { userState } from '../state.svelte.js';
	import Board from './board.svelte';


</script>

<div class="boards">
	{#each userState.boards as board}
		<p>{board.id}</p>
		<Board id="{board.id}" moves={board.moves} />
	{/each}
</div>

<style>
    .boards {
        display: grid;
        grid-template: 20px auto / repeat(4, max-content);
        gap: 2em;
        text-align: center;

        p {
            font-size: 30px;
        }
    }
</style>