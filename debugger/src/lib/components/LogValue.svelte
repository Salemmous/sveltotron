<script lang="ts">
	import JSONTree from 'svelte-json-tree';
	export let value: any;
</script>

<JSONTree {value} />
