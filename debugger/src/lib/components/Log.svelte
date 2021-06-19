<script>
	import LogValue from './LogValue.svelte';

	export let log;
</script>

<div class="py-8 border-t border-gray-100 border-opacity-50 w-full space-y-4">
	<h2>
		{log.function}
	</h2>
	{#each log.args as item}
		<LogValue value={item} />
	{/each}
</div>
