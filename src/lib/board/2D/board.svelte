<script lang="ts">
	import { getTabIndex, setNewMove } from '$lib/board/logic.svelte.js';
	import {  userState } from '$lib/state.svelte';

	let props: { board: Board[] } = $props();

	let lastMove = $derived(userState.moves[userState.moves.length - 1]?.id)

</script>

<div class="board">
	{#each props.board as field, i}
		<button
			id={field.id}
			class="{field.text === 'X' ? 'X' : 'O'} rect {lastMove === field.id ? 'highlight' : null}
{userState.winningFields.includes(field.id) ? 'winning-field' : null}"
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

						&&.winning-field {
								box-shadow: inset 0 0 10px 5px rgba(0, 128, 0, 0.75);
								position: relative;

								&::after {
										content: '';
										position: absolute;
										top: 0;
										left: 0;
										width: 100%;
										height: 100%;
                    box-shadow: 0 0 10px 10px rgba(0, 128, 0, 0.75);
								}
						}

            &.highlight {
                box-shadow: inset 0 0 10px 5px rgba(255, 0, 0, 0.75);
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    box-shadow: 0 0 10px 10px rgba(255, 0, 0, 0.75);
                }
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