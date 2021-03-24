// console.log = undefined;

interface Route {
	path: string | RegExp;
	callback: Function;
}

type RouterMode =
	'hash' |
	'history';

class Router {
	// Routes Array, valid routes are here, can be regexp or a string
	/**
	 * @type {[]}
	 */
	routes: Route[] = [];

	/**
	 * Holds the mode of the router
	 * 
	 * @type {String}
	 */
	mode: RouterMode = null;

	/**
	 * Root URL, change if this is in a sub-page
	 * 
	 * @type {String}
	 */
	root: string = '/';

	/**
	 * holds the handle on the interval as a number
	 */
	globalInterval: number | undefined;


	/**
	 * Holds the Current path in memory
	 */
	current: string;

	/**
	 * Initialises the Router Object
	 * 
	 * @param {Options} options 
	 * @param {Route[]} routes 
	 */
	constructor(options, routes) {
		this.mode = window.history.pushState ? "history" : "hash";
		if (options.mode) this.mode = options.mode;
		if (options.root) this.root = options.root;
		if (routes) this.routes = routes;
		this.listen();
	}

	/**
	 * Add a route to the instance
	 * 
	 * @param {string} path 
	 * @param {Function} callback
	 */
	add = (path, callback) => {
		this.routes.push({ path, callback });
		return this;
	};

	/**
	 * remove a path from the instance by name or regexp
	 * 
	 * @param {string | RegExp} path 
	 */
	remove = path => {
		for (let i = 0; i < this.routes.length; i += 1) {
			if (this.routes[i].path === path) {
				this.routes.slice(i, 1);
				return this;
			}
		}
		return this;
	};

	/**
	 * Clear Routes
	 * 
	 */
	flush = () => {
		this.routes = [];
		return this;
	};

	/**
	 * Removes Slashes from the path
	 * This is an internal parser function
	 * 
	 * @param {string} path 
	 * @returns {string}
	 */
	clearSlashes = path =>
		path
			.toString()
			.replace(/\/$/, '')
			.replace(/^\//, '');

	/**
	 * get URL fragment, (the "about" or  "")
	 * 
	 * @returns {string}
	 */
	getFragment = (): string => {
		let fragment = '';
		if (this.mode === "history") {
			fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
			fragment = fragment.replace(/\?(.*)$/, '');
			fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
		} else {
			const match = window.location.href.match(/#(.*)$/);
			fragment = match ? match[1] : '';
		}
		return this.clearSlashes(fragment);
	};

	/**
	 * Change Page
	 * 
	 * @param {string} path 
	 */
	navigate = (path = '') => {
		if (this.mode === "history") {
			window.history.pushState(null, null, this.root + this.clearSlashes(path));
		} else {
			window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
		}
		return this;
	};

	/**
	 * Listen for changes to URL to navigate between pages by URL change
	 */
	listen = () => {
		clearInterval(this.globalInterval);
		this.globalInterval = setInterval(this.interval, 50);
	};

	/**
	 * Used by listen to actually do its shitty job.
	 * 
	 * @returns {void}
	 */
	interval = () => {
		if (this.current === this.getFragment()) return;
		this.current = this.getFragment();

		this.routes.some(route => {
			const match = this.current.match(route.path);
			if (match) {
				match.shift();
				route.callback.apply({}, match);
				return match;
			}
			return false;
		});
	};
}

/**
 * Navigate between pages
 * 
 * @param {string} pathClass 
 */
function navigateClass(pathClass: string, wrapper: HTMLElement, indicator: HTMLElement) {
	if (pathClass == activeRouteClass) return;

	wrapper.classList.remove("member-editor", "crew-editor", "crew-display");
	indicator.classList.remove("member-editor", "crew-editor", "crew-display");

	wrapper.classList.add(pathClass);
	indicator.classList.add(pathClass);

	activeRouteClass = pathClass;
}

var activeRouteClass, router;



/**
 * Initialises everything once the DOM is loaded, this prevents pages from missing in the javascript, also adds more security.
 * 
 * kind of like the if __name__ == '__main__' of python
 */
document.addEventListener('DOMContentLoaded', () => {

	const main: HTMLElement = document.querySelector("main");
	const indicator: HTMLElement = document.querySelector("span#indicator");

	// create router instance
	router = new Router({ mode: 'hash', root: '/' },
		[
			{ path: 'member-editor', callback: () => navigateClass('member-editor', main, indicator) },
			{ path: 'crew-editor', callback: () => navigateClass('crew-editor', main, indicator) },
			{ path: 'crew-display', callback: () => navigateClass('crew-display', main, indicator) },
			{ path: '', callback: () => navigateClass('member-editor', main, indicator) }
		]
	);
});