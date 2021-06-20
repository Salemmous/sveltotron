<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter/index.svelte';
	import { time, elapsed, writtenStore } from '$lib/stores';
	import axios from 'axios';

	const handleRequest = async () => {
		const res = await fetch('https://randomuser.me/api/');
		res.json();
	};
	const handleAxiosRequest = async () => {
		await axios.get('https://randomuser.me/api/');
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>

		to your new<br />SvelteKit app
		<br />
		<button on:click={handleRequest}>Click here to test a GET request</button>
		<br />
		<button on:click={handleAxiosRequest}>Click here to test a GET request with Axios</button>
	</h1>

	<h2>
		try editing <strong>src/routes/index.svelte</strong>
	</h2>

	<Counter />
</section>

<section>
	<div>Time: {$time}</div>
	<div>Elapsed: {$elapsed}</div>
	<div>Written: {$writtenStore}</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
