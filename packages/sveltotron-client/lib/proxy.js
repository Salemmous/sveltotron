export function proxy(address, emit) {
	if (typeof window === 'undefined') return;
	proxyFetch(emit);
	proxyXMLHttpRequest(address, emit);
}

function proxyFetch(emit) {
	const _fetch = window.fetch;
	window.fetch = async (url, options, ...args) => {
		const uid = Math.floor(Math.random() * 99999999).toString();
		const method = options?.method || 'GET';
		emit('network-request', {
			...options,
			url,
			uid,
			date: new Date(),
			method,
		});
		const res = await _fetch(url, options, ...args);
		emit('network-response', {
			...options,
			method,
			url,
			uid,
			status: res.status,
			statusText: res.statusText,
			data: await res.clone().text(),
			responseType: res.type,
			date: new Date(),
		});
		return res;
	};
}

function proxyXMLHttpRequest(address, emit) {
	const proxiedRequest = window.XMLHttpRequest;
	const proxiedOpen = proxiedRequest.prototype.open;
	proxiedRequest.prototype.open = function (method, url) {
		const unmonitored = url.includes(address);
		if (unmonitored) return proxiedOpen.apply(this, [].slice.call(arguments));
		const uid = Math.floor(Math.random() * 99999999).toString();
		this.requestInfo = {
			method,
			url,
			uid,
		};
		return proxiedOpen.apply(this, [].slice.call(arguments));
	};
	const proxiedSend = proxiedRequest.prototype.send;
	proxiedRequest.prototype.send = function (body) {
		if (!this.requestInfo) return proxiedSend.apply(this, [].slice.call(arguments));
		emit('network-request', { ...this.requestInfo, body, date: new Date() });
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const pointer = this;
		const intervalId = window.setInterval(function () {
			if (pointer.readyState != 4) {
				return;
			}
			emit('network-response', {
				...this.requestInfo,
				status: pointer.status,
				statusText: pointer.statusText,
				data: pointer.responseText,
				responseType: pointer.responseType,
				date: new Date(),
			});
			clearInterval(intervalId);
		}, 1);
		return proxiedSend.apply(this, [].slice.call(arguments));
	};
	window.XMLHttpRequest = function () {
		return new proxiedRequest(arguments);
	};
}
