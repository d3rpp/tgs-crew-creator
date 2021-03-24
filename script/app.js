// console.log = undefined;
var Router = /** @class */ (function () {
    /**
     * Initialises the Router Object
     *
     * @param {Options} options
     * @param {Route[]} routes
     */
    function Router(options, routes) {
        var _this = this;
        // Routes Array, valid routes are here, can be regexp or a string
        /**
         * @type {[]}
         */
        this.routes = [];
        /**
         * Holds the mode of the router
         *
         * @type {String}
         */
        this.mode = null;
        /**
         * Root URL, change if this is in a sub-page
         *
         * @type {String}
         */
        this.root = '/';
        /**
         * Add a route to the instance
         *
         * @param {string} path
         * @param {Function} callback
         */
        this.add = function (path, callback) {
            _this.routes.push({ path: path, callback: callback });
            return _this;
        };
        /**
         * remove a path from the instance by name or regexp
         *
         * @param {string | RegExp} path
         */
        this.remove = function (path) {
            for (var i = 0; i < _this.routes.length; i += 1) {
                if (_this.routes[i].path === path) {
                    _this.routes.slice(i, 1);
                    return _this;
                }
            }
            return _this;
        };
        /**
         * Clear Routes
         *
         */
        this.flush = function () {
            _this.routes = [];
            return _this;
        };
        /**
         * Removes Slashes from the path
         * This is an internal parser function
         *
         * @param {string} path
         * @returns {string}
         */
        this.clearSlashes = function (path) {
            return path
                .toString()
                .replace(/\/$/, '')
                .replace(/^\//, '');
        };
        /**
         * get URL fragment, (the "about" or  "")
         *
         * @returns {string}
         */
        this.getFragment = function () {
            var fragment = '';
            if (_this.mode === "history") {
                fragment = _this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
                fragment = fragment.replace(/\?(.*)$/, '');
                fragment = _this.root !== '/' ? fragment.replace(_this.root, '') : fragment;
            }
            else {
                var match = window.location.href.match(/#(.*)$/);
                fragment = match ? match[1] : '';
            }
            return _this.clearSlashes(fragment);
        };
        /**
         * Change Page
         *
         * @param {string} path
         */
        this.navigate = function (path) {
            if (path === void 0) { path = ''; }
            if (_this.mode === "history") {
                window.history.pushState(null, null, _this.root + _this.clearSlashes(path));
            }
            else {
                window.location.href = window.location.href.replace(/#(.*)$/, '') + "#" + path;
            }
            return _this;
        };
        /**
         * Listen for changes to URL to navigate between pages by URL change
         */
        this.listen = function () {
            clearInterval(_this.globalInterval);
            _this.globalInterval = setInterval(_this.interval, 50);
        };
        /**
         * Used by listen to actually do its shitty job.
         *
         * @returns {void}
         */
        this.interval = function () {
            if (_this.current === _this.getFragment())
                return;
            _this.current = _this.getFragment();
            _this.routes.some(function (route) {
                var match = _this.current.match(route.path);
                if (match) {
                    match.shift();
                    route.callback.apply({}, match);
                    return match;
                }
                return false;
            });
        };
        this.mode = window.history.pushState ? "history" : "hash";
        if (options.mode)
            this.mode = options.mode;
        if (options.root)
            this.root = options.root;
        if (routes)
            this.routes = routes;
        this.listen();
    }
    return Router;
}());
/**
 * Navigate between pages
 *
 * @param {string} pathClass
 */
function navigateClass(pathClass, wrapper, indicator) {
    if (pathClass == activeRouteClass)
        return;
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
document.addEventListener('DOMContentLoaded', function () {
    var main = document.querySelector("main");
    var indicator = document.querySelector("span#indicator");
    // create router instance
    router = new Router({ mode: 'hash', root: '/' }, [
        { path: 'member-editor', callback: function () { return navigateClass('member-editor', main, indicator); } },
        { path: 'crew-editor', callback: function () { return navigateClass('crew-editor', main, indicator); } },
        { path: 'crew-display', callback: function () { return navigateClass('crew-display', main, indicator); } },
        { path: '', callback: function () { return navigateClass('member-editor', main, indicator); } }
    ]);
});
