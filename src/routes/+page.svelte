<script lang="ts">
	import Boards from './board/boards.svelte';
	import Menu from './menu/menu.svelte';
	import { userState } from './state.svelte';

	let text = $state('Witaj w grze kółko i krzyżyk');

	$effect(() => {
		text = `Ruch ${userState.move} gracza ${userState.tour}`
	})

</script>

<div class="root">
	<h1>{ text }</h1>
	<Boards />
	<Menu />
</div>
<style lang="less">
  .root {
    display: grid;
    grid-template-rows: 60px auto max-content;
    height: 100%;
    justify-items: center;

    h1 {
      grid-row: 1;
      font-size: 35px;
    }
  }
</style>