<script>
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import {
		faClipboardList,
		faSyncAlt,
		faGlobeAfrica,
		faMobile,
	} from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const PAGES = [
		{
			icon: faMobile,
			label: 'Device',
			path: '/',
		},
		{
			icon: faClipboardList,
			label: 'Logs',
			path: '/logs',
		},
		{
			icon: faSyncAlt,
			label: 'State',
			path: '/state',
		},
		{
			icon: faGlobeAfrica,
			label: 'Network',
			path: '/network',
		},
	];
</script>

<nav class="fixed bg-gray-700 flex flex-col p-2 space-y-8 py-8">
	{#each PAGES as navPage}
		<div
			class="flex flex-col justify-center items-center cursor-pointer text-gray-400 hover:text-gray-200"
			class:text-gray-50={$page.path === navPage.path}
			on:click={() => goto(navPage.path)}
		>
			<Icon data={navPage.icon} scale={3} /><span class="pt-2">{navPage.label}</span>
		</div>
	{/each}
</nav>

<div class="nav" />

<style>
	nav,
	.nav {
		height: 100vh;
		--width: 6rem;
		min-width: var(--width);
		width: var(--width);
		max-width: var(--width);
	}
</style>
