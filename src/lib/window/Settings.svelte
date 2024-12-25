<script lang="ts">
	import { globalSettings } from '$lib/state.svelte';
	import { fade } from 'svelte/transition';
	import WindowContainer from '$lib/window/WindowContainer.svelte';

</script>

<WindowContainer active_window="settings" window="large"
								 In="scale" Out="fly">
	<div class="settings">
		{#each $globalSettings as setting}
			<div class="setting">
				<div class="name">{setting.name}</div>
				<input type="color" name={setting.name} id={setting.name} bind:value={setting.value}>
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
    grid-row: 2;
    font-size: 4em;
    padding: 1em 0 1em 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    gap: 2em;
    display: grid;

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

      input {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        box-shadow: 0 0 20px 5px white;

        &[type="color"]::-webkit-color-swatch {
          border: none;
          border-radius: 10px;
          padding: 0;
        }

        &[type="color"]::-webkit-color-swatch-wrapper {
          border: none;
          border-radius: 10px;
          padding: 0;
        }
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
