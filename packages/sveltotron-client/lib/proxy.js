export function proxy(address, emit) {
	if (typeof window === 'undefined') return;
	proxyFetch(emit);
	proxyXMLHttpRequest(address, emit);
}

function proxyFetch(emit) {
	const _fetch = window.fetch;
	window.fetch = async (url, options, ...args) => {
		const uid = Math.floor(Math.random() * 99999999).toString();
		emit('network-request', { ...options, url, uid });
		const res = await _fetch(url, options, ...args);
		emit('network-response', {
			...options,
			url,
			uid,
			status: res.status,
			statusText: res.statusText,
			data: await res.clone().text(),
			responseType: res.type,
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
		emit('network-request', { ...this.requestInfo, body });
		//Here is where you can add any code to process the request.
		//If you want to pass the Ajax request object, pass the 'pointer' below
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
			});
			//Here is where you can add any code to process the response.
			//If you want to pass the Ajax request object, pass the 'pointer' below
			clearInterval(intervalId);
		}, 1); //I found a delay of 1 to be sufficient, modify it as you need.
		return proxiedSend.apply(this, [].slice.call(arguments));
	};
	window.XMLHttpRequest = function (...args) {
		return new proxiedRequest(arguments);
	};
}
