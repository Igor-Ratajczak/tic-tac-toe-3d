<script lang="ts">
	import { t } from 'svelte-i18n';
	import NewGameFriendIcon from '$lib/menu/icons/NewGameFriendIcon.svelte';
	import NewGameBotIcon from '$lib/menu/icons/NewGameBotIcon.svelte';
	import RulesIcon from '$lib/menu/icons/RulesIcon.svelte';
	import { userState } from '$lib/state.svelte';

	let welcomeScreen = $state(JSON.parse(localStorage.getItem('welcomeScreen')!) ?? true);

	$inspect(welcomeScreen);

	function closeWelcomeScreen() {
		welcomeScreen = false;
		localStorage.setItem('welcomeScreen', 'false');
	}

	$effect(() => {
		userState.active_window;
		if (userState.active_window === 'newGameFriend' ||
			userState.active_window === 'newGameBot') {
			welcomeScreen = false;
			localStorage.setItem('welcomeScreen', 'false');
		}
	});
</script>

{#if welcomeScreen}
	<div class="welcome-screen">
		<h1>{$t('hello')}</h1>
		<button class="close" onclick={() => closeWelcomeScreen()}>X</button>
		<div class="buttons">
			<NewGameFriendIcon />
			<NewGameBotIcon />
			<RulesIcon />
		</div>
		<div class="copyright">
			Copyright © 2024-{new Date().getUTCFullYear()} Igor Ratajczak All Rights Reserved
		</div>
	</div>
{/if}

<style lang="less">
  .welcome-screen {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 2em;
    background-image: linear-gradient(135deg, blue, purple 50%);
    z-index: 100000;

    h1 {
      font-size: 5em;
      text-align: center;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      gap: 5em;
      align-content: center;
      flex-wrap: wrap;
      justify-content: center;

      @media screen and (min-width: 772px) {
        gap: 10em;
        flex-direction: row;
      }

      :global(.menu-button) {
        width: max-content;
      }

      :global(b) {
        position: relative;
        z-index: 100000;
        padding: 0;
        top: 0;
        right: 0;
        transform: none;
        border-radius: 0;
        background: transparent;
        opacity: 1;
      }
    }

    .copyright {
      font-size: 2.8em;
      text-align: center;
    }
  }
</style>