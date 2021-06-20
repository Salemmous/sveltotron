import io from 'socket.io-client';
import { proxy } from './proxy';

const clientId = getClientId();

function getClientId() {
	if (typeof window === 'undefined') return Math.ceil(Math.random() * 999999).toString();
	const clientId =
		window.sessionStorage.getItem('__sveltotron_uid__') ||
		Math.ceil(Math.random() * 999999).toString();
	return clientId;
}

const DEFAULT_CONFIG = {
	port: 9090,
	host: '127.0.0.1',
	clientType: 'web',
	clientId,
};

let client;
export function start(config) {
	const port = config?.port || DEFAULT_CONFIG.port;
	const host = config?.host || DEFAULT_CONFIG.host;
	const clientId = config?.clientId || DEFAULT_CONFIG.clientId;
	if (typeof window !== 'undefined') window.sessionStorage.setItem('__sveltotron_uid__', clientId);
	const address = `http://${host}:${port}`;
	const socket = io(address);
	socket.emit('init', { name: clientId });
	const newConsole = {};
	Object.entries(console).forEach(([key, value]) => {
		newConsole[key] = (...args) => {
			socket.emit('console', { function: key, args });
			return value(...args);
		};
	});
	// eslint-disable-next-line no-global-assign
	console = newConsole;
	initClient(socket);
	proxy(address, emit);
}

let eventBuffer = [];

function initClient(socket) {
	client = socket;
	const buffer = [...eventBuffer];
	eventBuffer = [];
	buffer.forEach(({ event, args }) => client.emit(event, ...args));
}

export function emit(event, ...args) {
	if (!client) return eventBuffer.push({ event, args });
	client.emit(event, ...args);
}
