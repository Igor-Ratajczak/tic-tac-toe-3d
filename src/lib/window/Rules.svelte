<script>
	import WindowContainer from '$lib/window/WindowContainer.svelte';
	import rulesHorizontal from '$lib/assets/rules/rules-horizontal.png';
	import rulesHorizontalOne from '$lib/assets/rules/rules-horizontal-one-board.png';
	import rulesVertical from '$lib/assets/rules/rules-vertical.png';
	import rulesVerticalOne from '$lib/assets/rules/rules-vertical-one-board.png';
	import rulesDiagonally from '$lib/assets/rules/rules-diagonally.png';
	import rulesDiagonallyOne from '$lib/assets/rules/rules-diagonally-one-board.png';
	import rules4 from '$lib/assets/rules/rules-4.png';
	import rules4One from '$lib/assets/rules/rules-4-one-board.png';
	import rules4Info from '$lib/assets/rules/rules-4-info.png';

	import { t } from 'svelte-i18n';
</script>
<WindowContainer active_window="rules" window="large" In="fade" Out="blur-fly">
	<div class="content rules">
		<h3>{$t("rules.description")}</h3>
		{$t("rules.step1")}
		<ol>
			<li>{$t("rules.rules1")}
				<img src={rulesHorizontal} alt="winning rules horizontal">
				{$t("rules.theSome")}
				<img class="small" src={rulesHorizontalOne} alt="winning rules horizontal on one board">
			</li>
			<li>{$t("rules.rules2")}
				<img src={rulesVertical} alt="winning rules vertical">
				{$t("rules.theSome")}
				<img class="small" src={rulesVerticalOne}
						 alt="winning rules vertical on one board">
			</li>
			<li>{$t("rules.rules3")}
				<img src={rulesDiagonally} alt="winning rules diagonally">
				{$t("rules.theSome")}
				<img class="small" src={rulesDiagonallyOne}
						 alt="winning rules diagonally on one board">
			</li>
			<li>{$t("rules.rules4")}
				<img src={rules4} alt="winning rules on the same place">
				{$t("rules.rules4Question")}
				<img class="small" src={rules4One}
						 alt="winning rules on the same place on one board">
				{$t("rules.rules4-info")}
				<img class="small" src={rules4Info}
						 alt="winning rules on the same place on rotated boards">
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