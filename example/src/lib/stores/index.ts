import { writable, readable, derived } from '@sveltotron/client';

export const time = readable('time', new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 15000);

	return function stop() {
		clearInterval(interval);
	};
});

const start = new Date();

export const elapsed = derived('elapsed', time, ($time) =>
	Math.round(($time.getTime() - start.getTime()) / 1000),
);

export const writtenStore = writable('writtenStore', 0);

setInterval(() => {
	writtenStore.update((value) => value + 1);
}, 15000);
