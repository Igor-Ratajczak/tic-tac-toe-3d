<script lang="ts">
	import { globalSettings } from '$lib/state.svelte';
	import { fade } from 'svelte/transition';
	import WindowContainer from '$lib/window/WindowContainer.svelte';
	import { locale, locales, t } from 'svelte-i18n';

	let index: number = $state(0);
	let activeButtonLeft = $derived(index * 80);

	function changeLanguage(lang: string) {
		locale.set(lang);
	}

	locale.subscribe((locale) => {
		index = $locales.indexOf(locale!.slice(0, 2));
	});

</script>

<WindowContainer active_window="settings" window="large" In="scale" Out="fly">
	<div class="content settings">
		<div class="setting">
			<div class="languages" style={`--left-language-before: ${activeButtonLeft}px`}>
				{#each $locales as locale_lang}
					<button class="change-language"
									aria-label="change language"
									onclick={() => changeLanguage(locale_lang)}>{locale_lang}</button>
				{/each}
			</div>
		</div>
		{#each globalSettings as setting}
			<div class="setting">
				<label for="{setting.key}" class="name">{$t(`settings.${setting.key}`)}</label>
				<input type="color" name={setting.key} id={setting.key} bind:value={setting.value}>
				{#if setting.value !== setting.defaultValue}
					<button transition:fade class="resetValue" aria-label="Reset"
									onclick={() => setting.value = setting.defaultValue}>
						Zresetuj
					</button>
				{/if}
			</div>
		{/each}
	</div>
</WindowContainer>

<style lang="less">
  .settings {
    font-size: 4em;
    padding: 1em 0 1em 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    gap: 2em;

    .setting {
      display: grid;
      grid-template-rows: max-content 50px 100px;
      justify-content: center;
      gap: 1em;
      justify-items: center;

      @media screen and (min-width: 850px) {
        grid-template-columns: max-content 50px max-content;
        grid-template-rows: 100%;
        align-items: center;
      }

      .languages {
        grid-column: 1/4;
        width: max-content;
        display: flex;
        gap: 30px;
        position: relative;

        &::before {
          content: '';
          width: 50px;
          height: 50px;
          border-radius: 25px;
          box-shadow: 0 0 20px 10px green;
          position: absolute;
          transition: left 0.5s ease-in-out;
          left: var(--left-language-before);
        }

        .change-language {
          padding: 0;
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
      }

      .name {
        text-align: center;
      }

      button {
        font-size: 0.6em;
        border: 2px solid green;
        padding: 0.5em 1.5em;
        border-radius: 15px;
        width: max-content;
        height: max-content;
        align-self: center;
      }
    }
  }
</style>
