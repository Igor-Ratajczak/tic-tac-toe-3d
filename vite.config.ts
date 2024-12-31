import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			base: './',
			strategies: 'generateSW',
			registerType: 'autoUpdate',
			injectRegister: 'inline',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
			workbox: { globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,webmanifest}', 'prerendered/**/*.html'] },
			manifest: {
				name: 'Tic Tac Toe 3D',
				short_name: 'Tic Tac Toe 3D',
				description: 'Play Tic Tac Toe in a new dimension! A fun 3D twist on the classic game.',
				id: '/',
				start_url: './',
				display: 'standalone',
				background_color: '#0000FF',
				theme_color: '#800080',
				icons: [
					{
						src: '/web-app-manifest-144x144.png',
						sizes: '144x144',
						type: 'image/png',
						purpose: 'any'
					}, {
						src: '/web-app-manifest-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					}, {
						src: '/web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					}, {
						src: '/web-app-manifest-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable'
					}, {
						src: '/web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				],
				screenshots: [
					{
						src: 'web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						form_factor: 'narrow'
					},
					{
						src: 'web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						form_factor: 'wide'
					}
				]
			}
		})
	]
});
