// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"types.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrewMember = void 0;

var CrewMember =
/** @class */
function () {
  function CrewMember() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (args.length == 1) {
      this.fromInterface(args[0]);
    } else if (args.length == 5) {
      this.fromValues(args[0], args[1], args[2], args[3], args[4]);
    } else {
      throw new Error("Crew Member incorrectly initialised");
    }
  }

  CrewMember.prototype.fromInterface = function (i) {
    this.id = i.id;
    this.name = i.name;
    this.gender = i.gender;
    this.novice = i.novice;
    this.ageGroup = i.ageGroup;
  };

  CrewMember.prototype.fromValues = function (id, name, gender, ageGroup, novice) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.novice = novice;
    this.ageGroup = ageGroup;
  };

  return CrewMember;
}();

exports.CrewMember = CrewMember;
},{}],"member-editor.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberEditor = void 0;

var types_1 = require("./types");

var MemberEditor =
/** @class */
function () {
  function MemberEditor(querySelector) {
    this.testAgeGroups = ["U15", "U16", "U17", "U18"];

    try {
      this.mainPoint = document.querySelector(querySelector);
      this.table = this.mainPoint.querySelector("table");
      this.load(); // this.initTestData();               

      this.insertDataIntoTable();
      console.log("Member Editor: Initialised Successfully");
    } catch (e) {
      throw new Error("Member Editor: " + e);
    }
  }

  MemberEditor.prototype.testRandomNameGenerator = function (length) {
    var res = ''; // Stolen from stack overflow ;)

    for (var i = 0; i < length; i++) {
      var random = Math.floor(Math.random() * 27);
      res += String.fromCharCode(97 + random);
    }

    ;
    return res;
  };

  MemberEditor.prototype.idIsUsedforCrewMember = function (id) {
    var tmp = false;

    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        tmp = true;
      }
    }

    return tmp;
  };

  MemberEditor.prototype.initTestData = function () {
    this.data = [];

    for (var i = 0; i < 100; i++) {
      this.addCrewMember({
        name: this.testRandomNameGenerator(Math.floor(Math.random() * 7) + 5),
        gender: !!Math.round(Math.random()) ? "M" : "F",
        ageGroup: this.testAgeGroups[Math.floor(Math.random() * 4)],
        novice: !!Math.round(Math.random())
      });
    }
  };

  MemberEditor.prototype.addCrewMember = function (member) {
    var id;

    do {
      id = Math.floor(Math.random() * 100000);
    } while (this.idIsUsedforCrewMember(id));

    member.id = id;
    this.data.push(new types_1.CrewMember(member));
    this.save();
  };

  MemberEditor.prototype.save = function () {
    localStorage.setItem("crewMembers", btoa(JSON.stringify(this.data)));
  };

  MemberEditor.prototype.load = function () {
    if (localStorage.getItem('crewMembers') != null) {
      this.data = JSON.parse(atob(localStorage.getItem('crewMembers')));
    } else {
      this.data = [];
    }
  };

  MemberEditor.prototype.insertDataIntoTable = function () {
    // for (let i = 0; i < this.table.rows.length - 1; i++) {
    // 	if (i != 0) {
    // 		this.table.rows[i].remove();
    // 	}
    var _this = this; // }


    for (var i = 1; i < this.table.rows.length; i++) {
      try {
        this.table.deleteRow(i);
      } catch (e) {
        console.warn(e);
      }
    }

    this.data.forEach(function (val) {
      var row = _this.table.insertRow();

      row.innerHTML = "\n\t\t\t<tr>\n\t\t\t\t<td>" + val.gender + "</td>\n\t\t\t\t<td>" + val.ageGroup + " " + (val.novice ? "Novice" : "") + "</td>\n\t\t\t\t<td class=\"big\">" + val.name + "</td>\n\t\t\t\t<td>Actions</td>\n\t\t\t</tr>\n\t\t\t";
    });
  };

  return MemberEditor;
}();

exports.MemberEditor = MemberEditor;
},{"./types":"types.ts"}],"crew-editor.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrewEditor = void 0;

var CrewEditor =
/** @class */
function () {
  function CrewEditor(querySelector) {
    try {
      this.mainPoint = document.querySelector(querySelector);
      console.log("Crew Editor: Initialised Successfully");
    } catch (e) {
      throw new Error("Crew Editor: Unable to find master element for page");
    }
  }

  return CrewEditor;
}();

exports.CrewEditor = CrewEditor;
},{}],"crew-display.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrewDisplay = void 0;

var CrewDisplay =
/** @class */
function () {
  function CrewDisplay(querySelector) {
    try {
      this.mainPoint = document.querySelector(querySelector);
      console.log("Crew Display: Initialised Successfuly");
    } catch (e) {
      throw new Error("Crew Display: Unable to find master element for page");
    }
  }

  return CrewDisplay;
}();

exports.CrewDisplay = CrewDisplay;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var member_editor_1 = require("./member-editor");

var crew_editor_1 = require("./crew-editor");

var crew_display_1 = require("./crew-display");

var Router =
/** @class */
function () {
  /**
   * Initialises the Router Object
   */
  function Router(options, routes) {
    var _this = this;
    /**
     * 	Routes Array, valid routes are here, can be regexp or a string
     *
     */


    this.routes = [];
    /**
     * Holds the mode of the router
     *
     */

    this.mode = "hash";
    /**
     * Root URL, change if this is in a sub-page
     *
     */

    this.root = '/';
    /**
     * Holds the Current path in memory
     */

    this.current = "";
    /**
     * Add a route to the instance
     */

    this.add = function (path, callback) {
      _this.routes.push({
        path: path,
        callback: callback
      });

      return _this;
    };
    /**
     * remove a path from the instance by name or regexp
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
     */


    this.flush = function () {
      _this.routes = [];
      return _this;
    };
    /**
     * Removes Slashes from the path
     * This is an internal parser function
     */


    this.clearSlashes = function (path) {
      return path.toString().replace(/\/$/, '').replace(/^\//, '');
    };
    /**
     * get URL fragment, (the "about" or  "")
     */


    this.getFragment = function () {
      var fragment = '';

      if (_this.mode === "history") {
        fragment = _this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = _this.root !== '/' ? fragment.replace(_this.root, '') : fragment;
      } else {
        var match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : '';
      }

      return _this.clearSlashes(fragment);
    };
    /**
     * Change Page
     */


    this.navigate = function (path) {
      if (path === void 0) {
        path = '';
      }

      if (_this.mode === "history") {
        window.history.pushState(null, "", _this.root + _this.clearSlashes(path));
      } else {
        window.location.href = window.location.href.replace(/#(.*)$/, '') + "#" + path;
      }

      _this.current == path;
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
     * Used by listen to actually do its job.
     */


    this.interval = function () {
      if (_this.current === _this.getFragment()) return;
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
    }; // this.mode = window.history.pushState ? "history" : "hash";


    if (options.mode) this.mode = options.mode;
    if (options.root) this.root = options.root;
    if (routes) this.routes = routes;
    this.listen();
  }

  return Router;
}();
/**
 * Navigate between pages
 */


function navigateClass(pathClass, wrapper, indicator) {
  if (pathClass == activeRouteClass) return;
  wrapper.classList.remove("member-editor", "crew-editor", "crew-display");
  indicator.classList.remove("member-editor", "crew-editor", "crew-display");
  wrapper.classList.add(pathClass);
  indicator.classList.add(pathClass);
  activeRouteClass = pathClass;
}

var activeRouteClass, router;
var memberEditor;
var crewEditor;
var crewDisplay;
/**
 * Initialises everything,
 * in a brittish way tho
 */

var innit = function innit() {
  var main, indicator;
  HTMLElement;

  if (!('import' in document.createElement('link'))) {
    console.warn("HTML IMPORT NOT ENABLED");
  } // window.onstorage = (() => { console.log(window.localStorage) });


  window.addEventListener('storage', function () {
    console.log(window.localStorage);
  });

  try {
    main = document.querySelector("main.wrapper");
    indicator = document.querySelector("span#indicator");

    if (main == null || indicator == null) {
      throw new Error("Good Job Retard");
    }
  } catch (error) {
    // insult me, the only person using this code for being retarded and not setting up the DOM properly
    console.error("You did it wrong, your IQ is: " + Math.floor(Math.random() * -100));
    console.error({
      error: error
    }); // also prevents anything from working

    return;
  }

  try {
    memberEditor = new member_editor_1.MemberEditor(".page.member-editor");
    crewEditor = new crew_editor_1.CrewEditor(".page.crew-editor");
    crewDisplay = new crew_display_1.CrewDisplay(".page.crew-display");
  } catch (error) {
    console.error({
      error: error
    });
  } // create router instance


  router = new Router({
    mode: 'hash',
    root: '/'
  }, [{
    path: 'member-editor',
    callback: function callback() {
      return navigateClass('member-editor', main, indicator);
    }
  }, {
    path: 'crew-editor',
    callback: function callback() {
      return navigateClass('crew-editor', main, indicator);
    }
  }, {
    path: 'crew-display',
    callback: function callback() {
      return navigateClass('crew-display', main, indicator);
    }
  }, {
    path: '',
    callback: function callback() {
      return navigateClass('member-editor', main, indicator);
    }
  }]); // if (!('ontouchstart' in document.documentElement)) {
  // 	// Quality of Life Feature
  // 	// also technically an advanced feature
  // 	// allows page switching in tabs with arrow keys
  // 	window.onkeydown = (ev: KeyboardEvent) => {
  // 		switch (ev.key) {
  // 			case "ArrowLeft":
  // 				if (router.current == 'member-editor') break;
  // 				else if (router.current == 'crew-editor') router.navigate('member-editor');
  // 				else if (router.current == 'crew-display') router.navigate('crew-editor');
  // 				else break;
  // 				break;
  // 			case "ArrowRight":
  // 				if (router.current == 'member-editor') router.navigate('crew-editor');
  // 				else if (router.current == 'crew-editor') router.navigate('crew-display');
  // 				else if (router.current == 'crew-display') break;
  // 				else break;
  // 				break;
  // 			default:
  // 				break
  // 		}
  // 	}
  // }
};
/**
 * Starting Point of javascript program
 */


document.addEventListener('DOMContentLoaded', innit); // ████████╗██╗░░██╗██╗░██████╗  ██╗░██████╗  ██████╗░░█████╗░██████╗░  ██████╗░██╗░░░██╗████████╗
// ╚══██╔══╝██║░░██║██║██╔════╝  ██║██╔════╝  ██╔══██╗██╔══██╗██╔══██╗  ██╔══██╗██║░░░██║╚══██╔══╝
// ░░░██║░░░███████║██║╚█████╗░  ██║╚█████╗░  ██████╦╝███████║██║░░██║  ██████╦╝██║░░░██║░░░██║░░░
// ░░░██║░░░██╔══██║██║░╚═══██╗  ██║░╚═══██╗  ██╔══██╗██╔══██║██║░░██║  ██╔══██╗██║░░░██║░░░██║░░░
// ░░░██║░░░██║░░██║██║██████╔╝  ██║██████╔╝  ██████╦╝██║░░██║██████╔╝  ██████╦╝╚██████╔╝░░░██║░░░
// ░░░╚═╝░░░╚═╝░░╚═╝╚═╝╚═════╝░  ╚═╝╚═════╝░  ╚═════╝░╚═╝░░╚═╝╚═════╝░  ╚═════╝░░╚═════╝░░░░╚═╝░░░
// ██╗████████╗  ░██╗░░░░░░░██╗░█████╗░██████╗░██╗░░██╗░██████╗
// ██║╚══██╔══╝  ░██║░░██╗░░██║██╔══██╗██╔══██╗██║░██╔╝██╔════╝
// ██║░░░██║░░░  ░╚██╗████╗██╔╝██║░░██║██████╔╝█████═╝░╚█████╗░
// ██║░░░██║░░░  ░░████╔═████║░██║░░██║██╔══██╗██╔═██╗░░╚═══██╗
// ██║░░░██║░░░  ░░╚██╔╝░╚██╔╝░╚█████╔╝██║░░██║██║░╚██╗██████╔╝
// ╚═╝░░░╚═╝░░░  ░░░╚═╝░░░╚═╝░░░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░
// ░██████╗██╗░░░██╗██████╗░██████╗░██████╗░██╗░██████╗██╗███╗░░██╗░██████╗░██╗░░░░░██╗░░░██╗
// ██╔════╝██║░░░██║██╔══██╗██╔══██╗██╔══██╗██║██╔════╝██║████╗░██║██╔════╝░██║░░░░░╚██╗░██╔╝
// ╚█████╗░██║░░░██║██████╔╝██████╔╝██████╔╝██║╚█████╗░██║██╔██╗██║██║░░██╗░██║░░░░░░╚████╔╝░
// ░╚═══██╗██║░░░██║██╔══██╗██╔═══╝░██╔══██╗██║░╚═══██╗██║██║╚████║██║░░╚██╗██║░░░░░░░╚██╔╝░░
// ██████╔╝╚██████╔╝██║░░██║██║░░░░░██║░░██║██║██████╔╝██║██║░╚███║╚██████╔╝███████╗░░░██║░░░
// ╚═════╝░░╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝░░╚═╝╚═╝╚═════╝░╚═╝╚═╝░░╚══╝░╚═════╝░╚══════╝░░░╚═╝░░░
// ░██╗░░░░░░░██╗███████╗██╗░░░░░██╗░░░░░
// ░██║░░██╗░░██║██╔════╝██║░░░░░██║░░░░░
// ░╚██╗████╗██╔╝█████╗░░██║░░░░░██║░░░░░
// ░░████╔═████║░██╔══╝░░██║░░░░░██║░░░░░
// ░░╚██╔╝░╚██╔╝░███████╗███████╗███████╗
// ░░░╚═╝░░░╚═╝░░╚══════╝╚══════╝╚══════╝
//  i spent 20 minutes on that getting that in, no regrets
// 17:29:15 - File change detected. Starting incremental compilation...
// [0]
// [0]
// [0] 17:29:15 - Found 0 errors.Watching for file changes.
// - Compiler, i guess
},{"./member-editor":"member-editor.ts","./crew-editor":"crew-editor.ts","./crew-display":"crew-display.ts"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50110" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map