<script lang="ts">
	import NewGameFriend from '$lib/window/NewGameFriend.svelte';
	import NewGameBot from '$lib/window/NewGameBot.svelte';
	import SaveGame from '$lib/window/SaveGame.svelte';
	import Settings from './Settings.svelte';
	import LoadGame from '$lib/window/LoadGame.svelte';
	import History from '$lib/window/History.svelte';
</script>

<NewGameFriend />
<NewGameBot />
<SaveGame />
<LoadGame />
<History />
<Settings />