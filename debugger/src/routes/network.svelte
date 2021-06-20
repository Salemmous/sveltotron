<script>
	import NetworkRequest from '$lib/components/NetworkRequest.svelte';
	import { networkRequests, networkResponse } from '$lib/state';
</script>

<section class="p-4">
	<h1 class="text-blue-500">Network</h1>
	<div class="pt-8 w-full space-y-4">
		{#each $networkRequests as request}
			<div class="py-8 border-t border-gray-100 border-opacity-50 w-full">
				<NetworkRequest {request} response={$networkResponse[request.uid]} />
			</div>
		{/each}
	</div>
</section>
