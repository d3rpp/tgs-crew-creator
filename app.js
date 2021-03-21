const pages = document.querySelectorAll(".page");


class Router {
	// Routes Array, valid routes are here, can be regexp or a string
	/**
	 * @type {Route[]}
	 */
	routes = [];

	// Whether it uses the routers back page or a hash
	mode = null;

	// Root URL, change if this is in a sub-page
	root = '/';

	// Initialization function
	// constructor(options) {
	// 	this.mode = window.history.pushState ? 'history' : 'hash';
	// 	if (options.mode) this.mode = options.mode;
	// 	if (options.root) this.root = options.root;
	// 	this.listen();
	// }

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

	// Add a route to the instance
	add = (path, callback) => {
		this.routes.push({ path, callback });
		return this;
	};

	// remove a path from the instance by name or regexp
	remove = path => {
		for (let i = 0; i < this.routes.length; i += 1) {
			if (this.routes[i].path === path) {
				this.routes.slice(i, 1);
				return this;
			}
		}
		return this;
	};

	// Clear Routes
	flush = () => {
		this.routes = [];
		return this;
	};

	// Remove slashes from a route
	// PARSER Function
	clearSlashes = path =>
		path
			.toString()
			.replace(/\/$/, '')
			.replace(/^\//, '');

	// get URL fragment, (the "about" or  "")
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

	// Change Page
	navigate = (path = '') => {
		if (this.mode === 'history') {
			window.history.pushState(null, null, this.root + this.clearSlashes(path));
		} else {
			window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
		}
		return this;
	};

	// Listen for changes to URL to navigate between pages by URL change
	listen = () => {
		clearInterval(this.interval);
		this.interval = setInterval(this.interval, 50);
	};

	// Used by listen to actually do its shitty job.
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

// Navigate between pages
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
}

// create router instance
const router = new Router({ mode: 'hash', root: '/' },
	[
		{ path: /about/, callback: () => navigateClass('about') },
		{ path: '', callback: () => navigateClass('home') }
	]
);
