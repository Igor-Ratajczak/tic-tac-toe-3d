<script lang="ts">
	import NewGameFriend from './NewGameFriend.svelte';
	import NewGameBot from './NewGameBot.svelte';
	import SaveGame from './SaveGame.svelte';
	import LoadGame from './LoadGame.svelte';
	import History from './History.svelte';
	import Rules from './Rules.svelte';
	import Settings from './Settings.svelte';

</script>

<div class="menu">
	<NewGameFriend />
	<NewGameBot />
	<SaveGame />
	<LoadGame />
	<History />
	<Rules />
	<Settings />
</div>

<style global lang="less">
	.menu {
		grid-row: 3;
    display: flex;
    gap: 3em;
    padding: 1em 2em 1em 2em;
    width: max-content;
    height: max-content;
    position: relative;
    background-color: #ffffffa6;
    justify-self: center;
    border-radius: 50px;
    justify-content: center;
	}
</style>