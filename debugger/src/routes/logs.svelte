<script>
	import Log from '$lib/components/Log.svelte';
	import { console } from '$lib/state';
</script>

<section class="p-4">
	<h1 class="text-blue-50" style="-webkit-app-region: drag">Logs</h1>
	<div class="pt-8 w-full">
		{#each $console as log}
			<Log {log} />
		{/each}
	</div>
</section>
