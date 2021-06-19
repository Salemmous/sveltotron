import io from 'socket.io-client';

const DEFAULT_CONFIG = {
	port: 9090,
	host: '127.0.0.1',
	clientType: 'web',
	clientId: Math.ceil(Math.random() * 999999).toString(),
};

let client;
export function start(config) {
	const port = config?.port || DEFAULT_CONFIG.port;
	const host = config?.host || DEFAULT_CONFIG.host;
	const clientId = config?.clientId || DEFAULT_CONFIG.clientId;
	const socket = io(`http://${host}:${port}`);
	socket.emit('init', { name: clientId });
	const newConsole = {};
	Object.entries(console).forEach(([key, value]) => {
		newConsole[key] = (...args) => {
			socket.emit('console', { function: key, args });
			return value(...args);
		};
	});
	console = newConsole;
	initClient(socket);
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
