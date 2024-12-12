<script lang="ts">
	import NewGameFriend from './NewGameFriend.svelte';
	import NewGameBot from './NewGameBot.svelte';
	import SaveGame from './SaveGame.svelte';
	import LoadGame from './LoadGame.svelte';
	import History from './History.svelte';
	import Rules from './Rules.svelte';
	import Settings from './Settings.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	const large = new MediaQuery('min-width: 772px');
	let menu = $state(large.current);

	$effect(() => {
		menu = large.current;
	});
</script>
{#if !large.current}
	<button class="open-menu" onclick="{() => menu = true}">|||</button>
{/if}

{#if menu}
	<div class="menu">
		{#if !large.current}
			<button class="close" onclick="{() => menu = false}">X</button>
		{/if}
		<NewGameFriend />
		<NewGameBot />
		<SaveGame />
		<LoadGame />
		<History />
		<Rules />
		<Settings />
	</div>
{/if}
<style lang="less">
  .open-menu {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    letter-spacing: -5px;
    transform: rotateZ(90deg);
  }

  .menu {
    grid-row: 4;
    display: grid;
    gap: 32px;
    padding: 50px 20px 20px 20px;
    width: 100vw;
    height: 100vh;
    position: sticky;
		bottom: 0;
    background-color: rgba(9, 9, 9, 0.8);
    user-select: none;
		overflow-y: auto;
    z-index: 10000;

    .close {
      position: absolute;
      top: 0.5em;
      right: 1em;
      cursor: pointer;
      font-size: 30px;
    }

    @media screen and (min-width: 772px) {
     grid-template-columns: repeat(7, 1fr);
      padding: 1em 2em 1em 2em;
      width: max-content;
      height: max-content;
      background-color: #ffffffa6;
      justify-self: center;
      border-radius: 50px;
			overflow: visible;

      .close {
        display: none;
      }
    }
  }
</style>