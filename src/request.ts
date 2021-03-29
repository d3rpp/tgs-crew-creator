type RequestType = "GET" | "POST" | "PUT" | "OPTIONS" | "PATCH" | "DELETE";

interface HttpRequestOptions {
	headers?: Map<string, string>;
	method: RequestType;
	body?: any;
	url: string;
}

/**
 * "Promisifies" the XMLHttpRequest using a wrapper function
 * The function itself is synchronous but allows us to use promises to fetch data asynchronously
 */
function MakeHttpRequestAsync(options: HttpRequestOptions): Promise<Object> {
	return new Promise((resolve: Function, reject: Function) => {
		let xhr = new XMLHttpRequest;
		if (options.headers != null && options.headers != undefined) {
			options.headers.forEach((val, key) => {
				xhr.setRequestHeader(key, val);
			});
		}

		xhr.onerror = () => {
			reject(xhr.statusText);
		}

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				// RESULT WILL ALWAYS BE JSON
				resolve(JSON.parse(xhr.responseText));
			} else {
				reject(xhr.statusText)
			}
		}

		xhr.open(options.method, options.url);

		xhr.send(options.body ? options.body : null);
	});
}

export { MakeHttpRequestAsync, HttpRequestOptions, RequestType };