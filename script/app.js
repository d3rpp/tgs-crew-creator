"use strict";
var Router = (function () {
    function Router(options, routes) {
        var _this = this;
        this.routes = [];
        this.mode = "hash";
        this.root = '/';
        this.current = "";
        this.add = function (path, callback) {
            _this.routes.push({ path: path, callback: callback });
            return _this;
        };
        this.remove = function (path) {
            for (var i = 0; i < _this.routes.length; i += 1) {
                if (_this.routes[i].path === path) {
                    _this.routes.slice(i, 1);
                    return _this;
                }
            }
            return _this;
        };
        this.flush = function () {
            _this.routes = [];
            return _this;
        };
        this.clearSlashes = function (path) {
            return path
                .toString()
                .replace(/\/$/, '')
                .replace(/^\//, '');
        };
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
        this.navigate = function (path) {
            if (path === void 0) { path = ''; }
            if (_this.mode === "history") {
                window.history.pushState(null, "", _this.root + _this.clearSlashes(path));
            }
            else {
                window.location.href = window.location.href.replace(/#(.*)$/, '') + "#" + path;
            }
            _this.current == path;
            return _this;
        };
        this.listen = function () {
            clearInterval(_this.globalInterval);
            _this.globalInterval = setInterval(_this.interval, 50);
        };
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
var innit = function () {
    var main, indicator;
    HTMLElement;
    try {
        main = document.querySelector("main.wrapper");
        indicator = document.querySelector("span#indicator");
        if (main == null || indicator == null) {
            throw new Error("Good Job Retard");
        }
    }
    catch (error) {
        console.error("You did it wrong, your IQ is: " + Math.floor(Math.random() * -100));
        console.error({ error: error });
        return;
    }
    router = new Router({ mode: 'hash', root: '/' }, [
        { path: 'member-editor', callback: function () { return navigateClass('member-editor', main, indicator); } },
        { path: 'crew-editor', callback: function () { return navigateClass('crew-editor', main, indicator); } },
        { path: 'crew-display', callback: function () { return navigateClass('crew-display', main, indicator); } },
        { path: '', callback: function () { return navigateClass('member-editor', main, indicator); } }
    ]);
    if (!('ontouchstart' in document.documentElement)) {
        window.onkeydown = function (ev) {
            switch (ev.key) {
                case "ArrowLeft":
                    if (router.current == 'member-editor')
                        break;
                    else if (router.current == 'crew-editor')
                        router.navigate('member-editor');
                    else if (router.current == 'crew-display')
                        router.navigate('crew-editor');
                    else
                        break;
                    break;
                case "ArrowRight":
                    if (router.current == 'member-editor')
                        router.navigate('crew-editor');
                    else if (router.current == 'crew-editor')
                        router.navigate('crew-display');
                    else if (router.current == 'crew-display')
                        break;
                    else
                        break;
                    break;
                default:
                    break;
            }
        };
    }
};
document.addEventListener('DOMContentLoaded', innit);
//# sourceMappingURL=app.js.map