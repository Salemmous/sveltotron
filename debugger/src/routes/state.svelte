<script>
	import { stores } from '$lib/state';
	import JSONTree from 'svelte-json-tree';
</script>

<section class="p-4">
	<h1 class="text-blue-500">State</h1>
	<div class="pt-8 w-full space-y-4">
		{#each Object.values($stores) as store}
			<div class="py-8 border-t border-gray-100 border-opacity-50 w-full">
				{store.name}

				{#each store.value as value}
					<JSONTree {value} />
				{/each}
			</div>
		{/each}
	</div>
</section>
