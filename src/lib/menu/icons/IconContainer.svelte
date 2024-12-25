<script lang="ts">
	import { userState } from '$lib/state.svelte.js';
	import type { Snippet } from 'svelte';

	function setWindow(window: string) {
		userState.window = true;
		userState.active_window = window;
	}

	function OnKeyDown(e: KeyboardEvent, window: string) {
		if (e && e.key === 'Enter') {
			setWindow(window);
		}
	}

	let { children, window }: Props = $props();

	type Props = {
		children: Snippet
		window: 'newGameFriend' | 'newGameBot' | 'saveGame' | 'loadGame' | 'history' | 'rules' | 'settings';
	}
</script>

<div class="menu-button" role="button" tabindex="0" onclick={()=> setWindow(window)}
		 onkeydown={(e) => OnKeyDown(e, window)}>
	{@render children()}
</div>