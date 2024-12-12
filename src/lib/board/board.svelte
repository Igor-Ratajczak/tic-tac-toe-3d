<script lang="ts">
	import { getTabIndex, setNewMove, isLastMove } from '$lib/board/logic.svelte';

	let props: { board: Board[] } = $props();

</script>

<div class="board">
	{#each props.board as field, i}
		<button
			id={field.id}
			class="{field.text === 'X' ? 'X' : 'O'} rect {isLastMove(field.id) ? 'highlight' : null}"
			onclick={() => setNewMove(field)}
			tabindex="{getTabIndex(field.id.slice(0,1), i)}"
			disabled="{!!field.text }">
			{ field.text  }
		</button>
	{/each}
</div>


<style>
    .board {
        grid-row: 2;
        display: grid;
        grid-template-columns: repeat(4, 60px);
        grid-template-rows: repeat(4, 60px);
        border: 1px solid black;
        aspect-ratio: 1;
        width: calc(60px * 4);
        height: calc(60px * 4);
        background: var(--background-board);

        button {
            border: 1px solid black;
            cursor: pointer;
            text-align: center;
            align-content: center;
            font-size: 3em;
            color: black;

            &.highlight {
                border: 2px solid red;
                animation: pulse 1.5s infinite ease-in-out;
            }

						&:focus {
								outline: 5px solid green
						}

            &.X {
                color: red;
            }

            &.O {
                color: blue;
            }
        }
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 red;
        }
        50% {
            box-shadow: 0 0 15px 5px red;
        }
        100% {
            box-shadow: 0 0 0 0 red;
        }
    }
</style>