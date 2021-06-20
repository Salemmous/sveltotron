const { app, ipcMain, BrowserWindow } = require('electron');
const serve = require('electron-serve');
const ws = require('electron-window-state');
// try {
// 	require('electron-reloader')(module);
// } catch {}
const http = require('http');

const loadURL = serve({ directory: '.' });
const port = process.env.PORT || 4000;
const isDev = !app.isPackaged || process.env.NODE_ENV == 'development';
let mainWindow;

function loadVite(port) {
	mainWindow.loadURL(`http://127.0.0.1:${port}`).catch((err) => {
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	let mws = ws({
		defaultWidth: 1000,
		defaultHeight: 800,
	});

	mainWindow = new BrowserWindow({
		x: mws.x,
		y: mws.y,
		width: mws.width,
		height: mws.height,
		titleBarStyle: 'hidden',

		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: isDev,
		},
	});

	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (!isDev) mainWindow.removeMenu();
	else mainWindow.webContents.openDevTools();

	mws.manage(mainWindow);

	if (isDev) loadVite(port);
	else loadURL(mainWindow);
}

app.once('ready', createMainWindow);
app.on('activate', () => {
	if (!mainWindow) createMainWindow();
});
app.on('window-all-closed', () => {
	app.quit();
});

let messageBuffer = [];

function sendMessage(message, ...args) {
	if (!mainWindow) {
		messageBuffer.push({ message, args });
		return;
	}
	mainWindow.webContents.send(message, ...args);
}

let socketServer = http.createServer();
const io = require('socket.io')(socketServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});
io.on('connection', (client) => {
	sendMessage('server-connection');
	client.on('disconnect', () => {
		sendMessage('server-disconnection');
	});
	client.onAny((name, data) => {
		if (name !== 'update-store') console.log('EVENT', name, data);
		sendMessage(name, data);
	});
});

const SOCKET_IO_DEFAULT_PORT = 9090;

socketServer.listen(SOCKET_IO_DEFAULT_PORT, () => {
	sendMessage('server-started', { port: SOCKET_IO_DEFAULT_PORT });
});

ipcMain.on('page-init', () => {
	const buffer = [...messageBuffer];
	messageBuffer = [];
	buffer.forEach(({ message, args }) => sendMessage(message, ...args));
});
