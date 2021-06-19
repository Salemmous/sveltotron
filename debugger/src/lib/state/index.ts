import { writable } from 'svelte/store';

export function init() {
	if (typeof (global as any).window !== 'undefined') {
		initIPC();
	}
}

async function initIPC() {
	const { ipcRenderer } = require('electron');
	ipcRenderer.on('server-started', (_, config) => {
		server.set(config);
	});
	ipcRenderer.send('page-init');
}

export const server = writable(null);
export const connections = writable([]);
