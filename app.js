class Router {
	// Routes Array, valid routes are here, can be regexp or a string
	/**
	 * @type {Route[]}
	 */
	routes = [];

	/**
	 * Holds the mode of the router
	 * 
	 * @interface 'history', 'hash'
	 * @type {string}
	 */
	mode = null;

	/**
	 * Root URL, change if this is in a sub-page
	 * 
	 * @type {String}
	 */
	root = '/';

	/**
	 * Initialises the Router Object
	 * 
	 * @param {Options} options 
	 * @param {Route[]} routes 
	 */
	constructor(options, routes) {
		this.mode = window.history.pushState ? 'history' : 'hash';
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
	getFragment = () => {
		let fragment = '';
		if (this.mode === 'history') {
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
		if (this.mode === 'history') {
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
		clearInterval(this.interval);
		this.interval = setInterval(this.interval, 50);
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
function navigateClass(pathClass) {
	console.log(pathClass);
	// console.log(wrapper);
	pages.forEach((val) => {
		console.log(val.tagName);
		// Check for invalid tags, you can use <div> <section> and <main>
		// it just needs to be a child of the router-main element
		if (!(val.tagName == 'DIV' || val.tagName == 'SECTION' || val.tagName == 'MAIN')) return;
		if (val.classList.contains(pathClass)) {
			val.classList.toggle("hidden", false);
			val.classList.toggle("animate", true);
		} else {
			val.classList.toggle("hidden", true);
			val.classList.toggle("animate", false);
		}
	});

	activeRouteClass = pathClass;
}

var activeRouteClass, router, pages;

/**
 * Initialises everything once the DOM is loaded, this prevents pages from missing in the javascript, also adds more security.
 */
document.addEventListener('DOMContentLoaded', () => {
	pages = document.querySelectorAll(".page");
	// create router instance
	router = new Router({ mode: 'hash', root: '/' },
		[
			{ path: /about/, callback: () => navigateClass('about') },
			{ path: '', callback: () => navigateClass('home') }
		]
	);
});