<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import '../global.css';
	import { init } from '$lib/state';
	init();
</script>

<svelte:head>
	<title>Sveltotron</title>
</svelte:head>

<div class="flex flex-row">
	<Sidebar />
	<main class="ml-2 w-full">
		<slot />
	</main>
</div>
