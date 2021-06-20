<script lang="ts">
	import JSONTree from 'svelte-json-tree';
	export let request;
	export let response;

	function tryParse(value) {
		try {
			const res = JSON.parse(value);
			return res;
		} catch (_) {
			return value;
		}
	}
</script>

<div>{request.method} - {request.url}</div>
{#if request.body}
	<JSONTree value={tryParse(request.body)} />
{/if}
{#if response}
	<div class="text-sm">{response.status}</div>
	{#if response.data}
		<JSONTree value={tryParse(response.data)} />
	{/if}
{/if}
