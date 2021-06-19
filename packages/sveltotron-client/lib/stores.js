import {
	writable as svelteWritable,
	readable as svelteReadable,
	derived as svelteDerived,
} from 'svelte/store';
import { emit } from './socket';

function createStoreListener(storeFunc, storeType) {
	return (name, ...args) => {
		if (typeof window === 'undefined') return storeFunc(...args);
		const store = storeFunc(...args);
		emit('init-store', { name, value: args, type: storeType });
		store.subscribe((...value) => {
			emit('update-store', { name, value, type: storeType });
		});
		return store;
	};
}

export const writable = createStoreListener(svelteWritable, 'writable');
export const readable = createStoreListener(svelteReadable, 'readable');
export const derived = createStoreListener(svelteDerived, 'derived');
