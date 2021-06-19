<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import '../global.css';
</script>

<svelte:head>
	<title>Sveltotron</title>
</svelte:head>

<div class="flex flex-row">
	<Sidebar />
	<main class="ml-2">
		<slot />
	</main>
</div>
