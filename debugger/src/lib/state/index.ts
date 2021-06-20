import type { IConnection } from '$lib/models/connection';
import { derived, Writable, writable } from 'svelte/store';

export function init(): void {
	if (typeof (global as any).window !== 'undefined') {
		initIPC();
	}
}

async function initIPC() {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { ipcRenderer } = require('electron');
	ipcRenderer.on('server-started', (_, config) => {
		server.set(config);
	});
	ipcRenderer.on('init', (_, config) => {
		uniqueConnections.update((value) => {
			value[config.name] = config;
			return value;
		});
	});
	ipcRenderer.on('console', (_, config) => {
		console.update((value) => {
			value.push(config);
			return value;
		});
	});
	ipcRenderer.on('network-request', (_, req) => {
		networkRequests.update((value) => {
			value.push(req);
			return value;
		});
	});
	ipcRenderer.on('network-response', (_, res) => {
		networkResponse.update((value) => {
			value[res.uid] = res;
			return value;
		});
	});
	ipcRenderer.on('init-store', (_, store) => {
		stores.update((value) => {
			value[store.name] = store;
			return value;
		});
		storeHistory.update((value) => {
			value.push({ ...store, action: 'init' });
			return value;
		});
	});
	ipcRenderer.on('update-store', (_, store) => {
		stores.update((value) => {
			value[store.name] = store;
			return value;
		});
		storeHistory.update((value) => {
			value.push({ ...store, action: 'update' });
			return value;
		});
	});
	ipcRenderer.send('page-init');
}

export const server = writable(null);
const uniqueConnections = writable<{ [name: string]: IConnection }>({});
export const connections = derived<Writable<{ [name: string]: IConnection }>, IConnection[]>(
	uniqueConnections,
	($uniqueConnections) => Object.values($uniqueConnections),
);
export const console = writable([]);
export const networkRequests = writable([]);
export const networkResponse = writable({});
export const stores = writable({});
export const storeHistory = writable([]);
