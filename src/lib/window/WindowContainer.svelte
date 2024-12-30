<script lang="ts">
	import { userState } from '$lib/state.svelte.js';
	import { linear } from 'svelte/easing';
	import { fade, fly, scale, blur } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import { t } from 'svelte-i18n';

	let visible = $state(true);

	function closeWindow() {
		userState.window = false;
		userState.active_window = '';
		visible = true;
	}

	type Props = {
		children: Snippet
		active_window: string;
		window: 'large' | 'small'
		In: 'scale' | 'fade' | 'scale-from-side'
		Out: 'fly' | 'blur'
	}

	let { children, active_window, window, In, Out }: Props = $props();

	function customScale(node: Element) {
		return scale(node, { start: 10, duration: 1000, easing: linear });
	}

	function customFly(node: Element) {
		return fly(node, { x: 500, y: 500, duration: 1000 });
	}

	function scaleFromSide(node: Element) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 800,
			css: (t: number) => `
				transform: ${transform} scale(${t}) translate(50%);
				left: ${t - 52}%;
			`
		};
	}

	let transitionIn = $state(fade);
	let transitionOut = $state(fade);

	switch (In) {
		case 'fade':
			transitionIn = fade;
			break;
		case 'scale':
			transitionIn = customScale;
			break;
		case 'scale-from-side':
			transitionIn = scaleFromSide;
			break;
	}
	switch (Out) {
		case 'fly':
			transitionOut = customFly;
			break;
		case 'blur':
			transitionOut = blur;
			break;
	}
	$inspect(userState.active_window === active_window, userState.active_window, active_window);
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" ? closeWindow() : null}></svelte:window>

{#if userState.active_window === active_window}
	<div class="window {visible ? null : 'hide'} {window}" in:transitionIn
			 out:transitionOut>
		<button class="close" onclick={() => closeWindow()}>X</button>
		<h2 class="title">{$t(`windows.${userState.active_window}`)}</h2>
		{@render children()}
	</div>
{/if}
{#if userState.active_window === 'settings'}
	<button class="preview" onclick={()=>visible = !visible}>{visible ? 'Ukryj' : 'Pokaż'}</button>
{/if}

<style>
    .window {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: grid;
        z-index: 10000;
        place-items: center;
        background: rgba(0, 0, 0, 0.84);
        transition: height 0.5s ease;
        overflow: hidden;
        color-scheme: dark;

        &.large {
            grid-template-rows: 10% 90%;
        }

        &.small {
            grid-template: 20% 80% / 90% 10%;

            @media (min-width: 1000px) {
                border: 15px solid orange;
                border-image: linear-gradient(#041fda, #b2b2fa) 10;
                width: 50rem;
                height: 30rem;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        &.hide {
            height: 0
        }

        .close {
            font-size: 5em;
            position: absolute;
            top: 0;
            right: 0;
            margin: 10px 30px;
        }

        h2 {
            font-size: 5em;
            font-weight: bold;
            text-align: center;
            grid-column: 1/3;

            @media (min-width: 720px) {
                font-size: 4em;
            }
        }
    }

    .preview {
        position: absolute;
        top: calc(100vh - 98%);
        font-size: 2.5em;
        left: 2%;
        border: 2px solid green;
        padding: 10px;
        border-radius: 15px;
        z-index: 10000;
        background: black;
    }
</style>