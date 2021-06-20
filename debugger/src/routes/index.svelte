<script>
	import { connections } from '$lib/state';
</script>

<section class="p-4">
	<h1 class="text-blue-50" style="-webkit-app-region: drag">Devices</h1>
	<div class="pt-8 w-full">
		{#each $connections as connection}
			<div class="py-8 border-t border-gray-100 border-opacity-50 w-full">{connection.name}</div>
		{/each}
	</div>
</section>
