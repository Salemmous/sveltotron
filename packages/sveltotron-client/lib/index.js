import io from 'socket.io-client';

const DEFAULT_CONFIG = {
	port: 9090,
	host: '127.0.0.1',
};
export function start(config) {
	const port = config?.port || DEFAULT_CONFIG.port;
	const host = config?.host || DEFAULT_CONFIG.host;
	const socket = io(`http://${host}:${port}`);
}
