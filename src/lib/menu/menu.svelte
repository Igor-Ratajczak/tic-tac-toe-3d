<script lang="ts">
	import NewGameFriendIcon from './icons/NewGameFriendIcon.svelte';
	import NewGameBotIcon from './icons/NewGameBotIcon.svelte';
	import SaveGameIcon from './icons/SaveGameIcon.svelte';
	import LoadGamesIcon from './icons/LoadGamesIcon.svelte';
	import HistoryIcon from './icons/HistoryIcon.svelte';
	import RulesIcon from './icons/RulesIcon.svelte';
	import SettingsIcon from './icons/SettingsIcon.svelte';
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
		<NewGameFriendIcon />
		<NewGameBotIcon />
		<SaveGameIcon />
		<LoadGamesIcon />
		<HistoryIcon />
		<RulesIcon />
		<SettingsIcon />
	</div>
{/if}
<style lang="less">
  .open-menu {
    position: absolute;
    top: 5px;
    right: 30px;
    cursor: pointer;
    font-size: 20px;
    transform: rotateZ(90deg);
  }

  .menu {
    grid-row: 4;
    display: grid;
    gap: 32px;
    padding: 50px 20px 20px 20px;
    width: 100%;
    height: 100vh;
    height: 100svh;
    position: fixed;
    bottom: 0;
    background-color: rgba(9, 9, 9, 0.8);
    user-select: none;
    overflow-y: auto;
    z-index: 10000;
    justify-content: center;

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