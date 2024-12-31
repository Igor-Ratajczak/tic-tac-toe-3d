<script>
	import WindowContainer from '$lib/window/WindowContainer.svelte';
	import { t } from 'svelte-i18n';
</script>
<WindowContainer active_window="rules" window="large" In="fade" Out="blur-fly">
	<div class="content rules">
		<h3>{$t("rules.description")}</h3>
		{$t("rules.step1")}
		<ol>
			<li>{$t("rules.rules1")}
				<img src="/rules/rules-horizontal.png" alt="winning rules horizontal">
				{$t("rules.theSome")}
				<img class="small" src="/rules/rules-horizontal-one-board.png" alt="winning rules horizontal on one board">
			</li>
			<li>{$t("rules.rules2")}
				<img src="/rules/rules-vertical.png" alt="winning rules vertical">
				{$t("rules.theSome")}
				<img class="small" src="/rules/rules-vertical-one-board.png" alt="winning rules vertical on one board">
			</li>
			<li>{$t("rules.rules3")}
				<img src="/rules/rules-diagonally.png" alt="winning rules diagonally">
				{$t("rules.theSome")}
				<img class="small" src="/rules/rules-diagonally-one-board.png" alt="winning rules diagonally on one board">
			</li>
			<li>{$t("rules.rules4")}
				<img src="/rules/rules-4.png" alt="winning rules diagonally">
				{$t("rules.rules4Question")}
				<img class="small" src="/rules/rules-4-one-board.png" alt="winning rules diagonally on one board">
				{$t("rules.rules4-info")}
				<img class="small" src="/rules/rules-4-info.png" alt="winning rules diagonally on rotated boards">
			</li>
		</ol>
	</div>
</WindowContainer>

<style lang="less">
  .rules {
    width: 100%;
    height: 100%;
    padding: 2em;
    overflow: auto;
    text-align: center;

    ol {
      display: grid;
      gap: 2em;


      li {
        display: grid;
        gap: 2em;
        justify-items: center;
        margin-top: 2em;

        img {
          width: 100%;

          &.small {
            width: 50%;
          }

          @media screen and (min-width: 960px) {
            width: auto;

            &.small {
              width: auto;
            }
          }

        }
      }
    }
  }
</style>