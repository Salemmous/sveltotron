const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/network.svelte"),
	() => import("../../../src/routes/state.svelte"),
	() => import("../../../src/routes/logs.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/network.svelte
	[/^\/network\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/state.svelte
	[/^\/state\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/logs.svelte
	[/^\/logs\/?$/, [c[0], c[5]], [c[1]]]
];

export const fallback = [c[0](), c[1]()];