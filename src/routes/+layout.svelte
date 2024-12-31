<script lang="ts">
	import '../app.less';
	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';
	import { registerSW } from 'virtual:pwa-register';

	onMount(async () => {
		if (pwaInfo) {
			registerSW({
				immediate: true,
				onRegisteredSW(swUrl, r) {
					r && setInterval(() => {
						console.log('Checking for sw update');
						r.update();
					}, 20000);
					console.log(`SW Registered: ${swUrl}`);
				},
				onRegisterError(error: any) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	let webManifestLink = $state(pwaInfo ? pwaInfo.webManifest.linkTag : '');

	let { children } = $props();
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

{@render children()}
