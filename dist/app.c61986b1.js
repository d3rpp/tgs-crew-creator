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
exports.CrewMember = void 0; //#region CrewMemberEditor

/**
 * The Main Crew Member Class, used by multiple file as a common dependency, allows for consistency between pages
 */

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberEditor = void 0;

var types_1 = require("./types");

var MemberEditor =
/** @class */
function () {
  // public update() {
  // 	this.load();
  // 	this.insertDataIntoTable();
  // 	this.updateViewer();
  // }
  function MemberEditor(querySelector) {
    var _this = this;

    this.testAgeGroups = ["U15", "U16", "U17", "U18"];
    this.index = -1;
    this.buffer = {
      id: -1,
      name: "",
      gender: "",
      ageGroup: "",
      novice: undefined
    }; // main point of the element
    // prevents clashes between tabs, as long as i use this in place of `document`;

    try {
      this.mainPoint = document.querySelector(querySelector);
    } catch (error) {
      throw new Error("Member Editor: MainPoint not found");
    } // Get all of the elements


    try {
      this.table = this.mainPoint.querySelector("table");
      this.editor = this.mainPoint.querySelector('.editor');
      this.viewer = this.mainPoint.querySelector('.viewer');
      this.name = this.editor.querySelector("input.nameInput");
      this.name.addEventListener('input', function () {
        _this.buffer.name = _this.name.value;

        _this.updateViewer();
      });
      this.ageGroupSelect = this.editor.querySelector("select.age-group");
      this.ageGroupSelect.addEventListener('input', function () {
        _this.buffer.ageGroup = _this.ageGroupSelect.value;

        _this.updateViewer();
      });
      this.genderSelect = this.editor.querySelector("select.gender");
      this.genderSelect.addEventListener('input', function () {
        _this.buffer.gender = _this.genderSelect.value;

        _this.updateViewer();
      });
      this.noviceSwitch = this.editor.querySelector(".novice");
      this.noviceSwitch.addEventListener('change', function () {
        _this.buffer.novice = _this.noviceSwitch.checked;

        _this.updateViewer();
      });
      this.clearButton = this.editor.querySelector(".buttons button.clear");
      this.clearButton.addEventListener('mouseup', function () {
        // this.buffer = {};
        _this.resetBuffer();

        _this.updateInputForm();

        _this.updateViewer();
      });
      this.submitButton = this.editor.querySelector(".buttons button.submit");
      this.submitButton.addEventListener('mouseup', function () {
        if (!_this.confirmAndSubmitDataFromForm()) {
          alert("There was an error");
        } // this.buffer = {};


        _this.resetBuffer();

        _this.updateViewer();
      });
    } catch (error) {
      throw new Error("Member Editor: Element(s) missing");
    }

    try {
      if (localStorage.getItem('crewMembers') == null) {
        this.initTestData();
      } else {
        this.load();
      }

      this.sort(this.data);
    } catch (error) {
      console.error(error);
      throw new Error("Member Editor: Failed when loading stuff or getting test data");
    } // this.initTestData();


    this.insertDataIntoTable();
    this.updateViewer();
    console.log("Member Editor: Initialised Successfully"); // } catch (e) {
    // 	throw new Error("Member Editor: " + e);
    // }
  }
  /**
   * Create a randomly generated ascii string, good for getting test data
   *
   * @param length Length of the string wanted
   * @returns A Random string of ascii text
   */


  MemberEditor.prototype.testRandomNameGenerator = function (length) {
    return Math.random().toString(36).substr(2, length);
  };
  /**
   * Dump the buffere element to the console
   */


  MemberEditor.prototype.dumpBuffer = function () {
    console.warn("CURRENT BUFFER IN MEMBER EDITOR", this.buffer);
  };
  /**
   * Checks if the ID is in use
   *
   * @param id The ID to be checked
   * @returns true if the id is in use
   */


  MemberEditor.prototype.idIsUsedforCrewMember = function (id) {
    var tmp = false;

    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        tmp = true;
      }
    }

    return tmp;
  };
  /**
   * Give the editor buttons their functionality, uses events in order to wait for clicking
   */


  MemberEditor.prototype.setupButtons = function () {
    var _this = this;

    this.mainPoint.querySelectorAll(".actions").forEach(function (val) {
      val.querySelectorAll('button').forEach(function (button) {
        if (button.classList.contains('edit')) {
          button.addEventListener('click', function () {
            _this.dumpBuffer();

            _this.buffer.id = +button.getAttribute("data-id");

            _this.pushInputToBuffer();

            _this.loadDataIntoInputForm( // Welcome to casting strings to numbers in typescript
            +button.getAttribute('data-index'));

            _this.dumpBuffer();
          });
        } else if (button.classList.contains('delete')) {
          // this.buffer = {};
          _this.resetBuffer();

          _this.updateInputForm();

          button.addEventListener('click', function () {
            var tmp = _this.data[+button.getAttribute('data-index')];

            if (confirm('are you sure you\'d like to delete ' + tmp.name)) {
              _this.data.splice(+button.getAttribute('data-index'), 1);

              _this.save();

              _this.insertDataIntoTable();
            }
          });
        }
      });
    });
  };
  /**
   * Verifies and Validates the buffer, which is synced with the inputs, so this serves as a form of input validation
   * @returns true if the contents of the buffer and be considered a valid CrewMember Object
   */


  MemberEditor.prototype.validateBuffer = function () {
    if (this.buffer.name == "" || this.buffer.name == undefined || this.buffer.name == null) {
      this._val = 'name';
      this.dumpBuffer();
      return false;
    }

    ;

    if (!this.buffer.ageGroup) {
      this._val = 'ageGroup';
      this.dumpBuffer();
      return false;
    }

    ;

    if (!(this.buffer.gender == "M" || this.buffer.gender == "F")) {
      this._val = 'gender';
      this.dumpBuffer();
      return false;
    }

    ;

    if (!(this.buffer.novice == true || this.buffer.novice == false)) {
      this.dumpBuffer();
      return false;
    }

    ;
    return true;
  };
  /**
   * Updates the viewer element with the latest data from the buffer
   */


  MemberEditor.prototype.updateViewer = function () {
    // this.dumpBuffer();
    this.viewer.innerHTML = (!!this.buffer.gender ? this.buffer.gender : 'Gender') + " | " + (!!this.buffer.ageGroup ? this.buffer.ageGroup : 'Age Group') + ' ' + (this.buffer.novice ? 'Novice' : '') + ' | ' + (!!this.buffer.name ? this.buffer.name : 'Name');
  };
  /**
   * loads the data of a crew member from the data array into the buffer
   *
   * @param index index of a CrewMember object in the data array
   */


  MemberEditor.prototype.loadDataIntoInputForm = function (index) {
    this.name.value = this.data[index].name;
    this.noviceSwitch.checked = this.data[index].novice;
    this.ageGroupSelect.value = this.data[index].ageGroup;
    this.genderSelect.value = this.data[index].gender; // this.

    this.pushInputToBuffer();
    this.submitButton.innerHTML = "Update";
  };
  /**
   * Sets the buffer to its default 0 value
   */


  MemberEditor.prototype.resetBuffer = function () {
    this.buffer.name = "";
    this.buffer.ageGroup = "";
    this.buffer.gender = "";
    this.buffer.id = -1;
    this.buffer.novice = false;
    this.updateInputForm();
    this.updateViewer();
  };
  /**
   * Pushes the buffer to the UI Form
   */


  MemberEditor.prototype.updateInputForm = function () {
    // this.dumpBuffer();
    this.name.value = !!this.buffer.name ? this.buffer.name : "";
    this.ageGroupSelect.value = !!this.buffer.ageGroup ? this.buffer.ageGroup : "";
    this.genderSelect.value = !!this.buffer.gender ? this.buffer.gender : "";
    this.noviceSwitch.checked = this.buffer.novice ? this.buffer.novice : false;
  };
  /**
   * Creates test data, uses the random name generator from above
   */


  MemberEditor.prototype.initTestData = function () {
    this.data = [];
    var amountOfData = 100;

    for (var i = 0; i < amountOfData; i++) {
      this.addCrewMember({
        name: this.testRandomNameGenerator(Math.floor(Math.random() * 7) + 5),
        gender: !!Math.round(Math.random()) ? "M" : "F",
        ageGroup: this.testAgeGroups[Math.floor(Math.random() * 4)],
        novice: !!Math.round(Math.random()),
        id: this.createUID()
      });
    }

    console.log(this.data);
  };

  MemberEditor.prototype.pushInputToBuffer = function () {
    this.buffer.name = this.name.value;
    this.buffer.ageGroup = this.ageGroupSelect.value;
    this.buffer.gender = this.genderSelect.value;
    this.buffer.novice = this.noviceSwitch.checked;
  };
  /**
   * Returns the index in this.data of an element with the specified id
   *
   * @param id The id of the element you'd like to find the index of
   * @returns the index in this.data of the element with the id or `undefined` if not found
   */


  MemberEditor.prototype.getIndexOfID = function (id) {
    var i = -1;
    if (id < 0) return null;
    this.data.some(function (val, index) {
      if (val.id == id) {
        i = index;
        return true;
      }

      return false;
    });
    return i;
  };

  MemberEditor.prototype.createUID = function () {
    var _loop_1 = function _loop_1(i) {
      if (!this_1.data.some(function (val) {
        return val.id == i;
      })) {
        return {
          value: i
        };
      }
    };

    var this_1 = this;

    for (var i = 0; i < 10000; i++) {
      var state_1 = _loop_1(i);

      if (_typeof(state_1) === "object") return state_1.value;
    }
  };
  /**
   * Validates the data in the buffer and adds it to the data array, immediately saving the data array to window.localStorage
   * the updates the UI with the latest changes
   *
   * @returns true if the submition of the data was successful, otherwise the problem will be pushed to this._val
   */


  MemberEditor.prototype.confirmAndSubmitDataFromForm = function () {
    if (!this.validateBuffer()) {
      console.error("Error In ", this._val);
      this.dumpBuffer();
      return false;
    }

    if (this.buffer.id == -1) {
      if (!confirm("Are you sure that you'd like to add " + this.buffer.gender + " " + this.buffer.ageGroup + (this.buffer.novice ? " Novice" : "") + " named " + this.buffer.name)) return false;
      this.buffer.id = this.createUID(); // this.buffer.id = -1;

      this.addCrewMember(this.buffer);
      this.save();
    } else {
      if (!confirm("Are you sure that you'd like to update " + this.buffer.gender + " " + this.buffer.ageGroup + (this.buffer.novice ? " Novice" : "") + " named " + this.buffer.name)) return false;
      var index = this.getIndexOfID(this.buffer.id);
      this.data[index] = new types_1.CrewMember(this.buffer);
      this.save();
    }

    this.submitButton.innerHTML = "Save";
    this.insertDataIntoTable();
    return true;
  };
  /**
   *
   * Pushes the supplied crew member to the data array object and saves it
   *
   * @param member the member to be added
   */


  MemberEditor.prototype.addCrewMember = function (member) {
    if (this.idIsUsedforCrewMember(member.id)) {
      this.data[this.getIndexOfID(member.id)] = new types_1.CrewMember(member);
    } else {
      this.data.push(new types_1.CrewMember(member));
    }

    this.save();
  };

  MemberEditor.prototype.sort = function (list) {
    var ageGroups = ["U15", "U16", "U17", "U18"];
    list.sort(function (a, b) {
      if (a.gender == "M" && b.gender == "F") return -1;
      if (a.gender == "F" && b.gender == "M") return 1;
      if (a.gender == b.gender) return 0;
    });
    list.sort(function (a, b) {
      if (a.novice && !b.novice) return 1;
      if (!a.novice && b.novice) return -1;
      return 0;
    });
    list.sort(function (a, b) {
      return ageGroups.indexOf(b.ageGroup) - ageGroups.indexOf(a.ageGroup);
    });
    return list;
  };
  /**
   * Saves the data object array to window.localStorage by base64 encoding it after it has been srtringified
   *
   * allows for persistent data usage
   */


  MemberEditor.prototype.save = function () {
    this.sort(this.data);
    localStorage.setItem("crewMembers", btoa(JSON.stringify(this.data)));
    window.dispatchEvent(new Event("crewMembersEdited"));
  };
  /**
   * Loads the data from window.localStorage into the data array
   *
   * if there is no data to load, it initialises the data array to an empty array
   */


  MemberEditor.prototype.load = function () {
    if (localStorage.getItem('crewMembers') != null) {
      this.data = JSON.parse(atob(localStorage.getItem('crewMembers')));
    } else {
      this.data = [];
    }

    this.save();
  };
  /**
   * Updates the table with the up to date information by deleting all of the rows and adding the new ones in,
   * it isnt the most efficient way to do it but it works
   */


  MemberEditor.prototype.insertDataIntoTable = function () {
    var _this = this;

    this.table.innerHTML = "\n\t\t\t<tr class=\"header\">\n\t\t\t\t<th>Gender</th>\n\t\t\t\t<th>Age Group</th>\n\t\t\t\t<th class=\"big\">Name</th>\n\t\t\t\t<th>Actions</th>\n\t\t\t</tr>\n\t\t";
    this.data.forEach(function (val, i) {
      var row = _this.table.insertRow();

      row.innerHTML = "\n\t\t\t\t<td>" + val.gender + "</td>\n\t\t\t\t<td>" + val.ageGroup + " " + (val.novice ? "Novice" : "") + "</td>\n\t\t\t\t<td class=\"big\">" + val.name + "</td>\n\t\t\t\t<td class=\"actions\">\n\t\t\t\t\t<button class=\"edit material-icons\" data-index=\"" + i + "\" data-id=\"" + val.id + "\">edit</button>\n\t\t\t\t\t<button class=\"delete material-icons\" data-index=\"" + i + "\" data-id=\"" + val.id + "\">delete</button>\n\t\t\t\t</td>\n\t\t\t\n\t\t\t";
    }); // calls setup buttons afterwards to make the edit and delete buttons work

    this.setupButtons();
  };

  return MemberEditor;
}();

exports.MemberEditor = MemberEditor;
},{"./types":"types.ts"}],"components/CrewEditorItem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrewEditorItem = void 0;

var CrewEditorItem =
/** @class */
function () {
  /**
   *
   * @param args The Arguments, can be one of 2 overflows
   */
  function CrewEditorItem(args) {
    this.coachName = "";
    this.crewName = "";
    this.boatName = "";
    this.oars = "";
    this.seatCount = 0;
    /**
     * Yet To IMPLEMENT
     * TODO: Implement this BS
     */

    this.currentError = undefined;
    this.currentWarning = undefined;

    if (args.serialisedForm) {
      this.parentElement = args.parent;
      this.deserialise(args.serialisedForm);
    } else if (args.config) {
      this.fromParentAndConfig(args.parent, args.config);
    } else {
      console.error("Unable to Construct Crew Member Editor");
    }
  }
  /**
   * Tells the parent (Crew Editor Class) to save the crews,
   * this happens a lot as this is saved in real time
   */


  CrewEditorItem.prototype.save = function () {
    this.parentElement.dispatchEvent(new Event("save"));
  };

  ;
  /**
   * This is when the CrewEditorItem is brand new, it sets everything up
   *
   * @param parent parent element, probably not actually needed
   * @param config The Config such as crew Size and whether or not there is a cox
   */

  CrewEditorItem.prototype.fromParentAndConfig = function (parent, config) {
    this.masterElement = document.createElement('div');
    this.parentElement = parent;
    this.seatCount = config.size;
    this.coxed = config.coxed;
    this.seats = new Array(this.seatCount + (this.coxed ? 1 : 0));
    this.seats.fill(undefined);
  };
  /**
   * 	This is when the CrewEditorItem is being loaded as a result of the window.localStorage being existant for this
   *
   * @param serialisedForm the Simplified form of this thing, used for more efficient storage
   */


  CrewEditorItem.prototype.deserialise = function (serialisedForm) {
    this.masterElement = document.createElement('div'); // We are inferring the seat count and cox from the length of the serialised form;

    switch (serialisedForm.seats.length) {
      case 1:
        this.seatCount = 1;
        this.coxed = false;
        break;

      case 2:
        this.seatCount = 2;
        this.coxed = false;
        break;

      case 4:
        this.seatCount = 4;
        this.coxed = false;
        break;

      case 5:
        this.seatCount = 4;
        this.coxed = true;
        break;

      case 9:
        this.seatCount = 8;
        this.coxed = true;
        break;
    }

    this.seats = serialisedForm.seats;
    this.boatName = serialisedForm.boatName; // this._boatNameInput.value = serialisedForm.boatName;

    this.crewName = serialisedForm.crewType; // this._crewNameInput.value = serialisedForm.crewType;

    this.oars = serialisedForm.oars; // this._oarsInput.value = serialisedForm.oars;

    this.coachName = serialisedForm.coachName; // this._coachNameInput.value = serialisedForm.coachName;
  };
  /**
   * turns it from a class with functions to an interface with only the required data
   *
   * @returns Simplified form of this class
   */


  CrewEditorItem.prototype.serialise = function () {
    // if (!this.validate()) return;
    var tmp = {
      seats: this.seats ? this.seats : [],
      coachName: this.coachName ? this.coachName : "",
      boatName: this.boatName ? this.boatName : "",
      crewType: this.crewName ? this.crewName : "",
      oars: this.oars ? this.oars : ""
    };
    return tmp;
  };
  /**
   * Returns true if this piece of sh*t is valid, NEVER TRUST USER INPUT
   *
   * @returns Whether this piece of shit is valid
   */


  CrewEditorItem.prototype.validate = function () {
    // MMMMMMMMMM REGEX
    var crewNameRegex = /(M|W|G|B) (U|N)((1)(5|6|7|8)) ((1|2|4|8)X?(\+|-))/;

    if (this.crewName == "") {
      this.currentError = "No Crew Name";
    }

    if (!this.crewName.toUpperCase().match(crewNameRegex)) {
      this.currentError = "Invalid Name";
      return false;
    }

    return true;
  };
  /**
   * Initialises the inputs
   */


  CrewEditorItem.prototype.initInputs = function () {
    var _this = this;

    var m = this.masterElement;

    try {
      this._coachNameInput = m.querySelector("input.coach");
      this._crewNameInput = m.querySelector("input.crew-type");
      this._boatNameInput = m.querySelector("input.boat");
      this._oarsInput = m.querySelector("input.oars");
    } catch (e) {
      console.error("Error Initialising Inputs on Crew Editor Item", e);
    }

    try {
      this._coachNameInput.addEventListener('input', function () {
        _this.coachName = _this._coachNameInput.value;

        _this.save();
      });

      this._crewNameInput.addEventListener('input', function () {
        _this.crewName = _this._crewNameInput.value;

        _this.save();
      });

      this._boatNameInput.addEventListener('input', function () {
        _this.boatName = _this._boatNameInput.value;

        _this.save();
      });

      this._oarsInput.addEventListener('input', function () {
        _this.oars = _this._oarsInput.value;

        _this.save();
      });
    } catch (e) {
      console.error("Error Initilising Event Listeners on Crew Editor Item Inputs", e);
    }
  };
  /**
   * React Style Render Function, just works
   */


  CrewEditorItem.prototype.render = function () {
    var _this = this;

    var tmp = document.createElement('div');
    tmp.classList.add("item");
    var sizeString;
    var coxString;

    switch (this.seatCount) {
      case 1:
        tmp.classList.add("single");
        sizeString = "single";
        break;

      case 2:
        tmp.classList.add("double");
        sizeString = "double";
        break;

      case 4:
        tmp.classList.add("quad");
        sizeString = "quad";
        break;

      case 8:
        tmp.classList.add("octuple");
        sizeString = "octuple";
        break;
    }

    if (this.coxed) {
      coxString = "coxed";
    } else {
      coxString = "coxless";
    }

    tmp.innerHTML = "\n\t\t\t<div class=\"topRow\">\n\t\t\t\t<div class=\"input crew-type\">\n\t\t\t\t\t<input type=\"text\" required class=\"crew-type\" value=\"" + (this.crewName ? this.crewName : "") + "\">\n\t\t\t\t\t<span class=\"highlight\"></span>\n\t\t\t\t\t<span class=\"bar\"></span>\n\t\t\t\t\t<label>Crew Type</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input oars\">\n\t\t\t\t\t<input type=\"text\" required class=\"oars\" value=\"" + (this.oars ? this.oars : "") + "\">\n\t\t\t\t\t<span class=\"highlight\"></span>\n\t\t\t\t\t<span class=\"bar\"></span>\n\t\t\t\t\t<label>Oars</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"middleRow\">\n\t\t\t\t<div class=\"input coach\">\n\t\t\t\t\t<input type=\"text\" required class=\"coach\" value=\"" + (this.coachName ? this.coachName : "") + "\">\n\t\t\t\t\t<span class=\"highlight\"></span>\n\t\t\t\t\t<span class=\"bar\"></span>\n\t\t\t\t\t<label>Coach</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"input boat\">\n\t\t\t\t\t<input type=\"text\" required class=\"boat\" value=\"" + (this.boatName ? this.boatName : "") + "\">\n\t\t\t\t\t<span class=\"highlight\"></span>\n\t\t\t\t\t<span class=\"bar\"></span>\n\t\t\t\t\t<label>Boat Name</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"names " + sizeString + " " + coxString + "\">\n\n\t\t\t<!-- Every Boat has a Stroke Seat -->\n\n\t\t\t\t<div class=\"droppable\"\n\t\t\t\t\t" + (!!this.seats[0] ? "\n\t\t\t\t\t\tdata-id=\"" + this.seats[0].id + "\" \n\t\t\t\t\t\tdata-name=\"" + this.seats[0].name + "\"\n\t\t\t\t\t\tdata-novice=\"" + (this.seats[0].novice ? "true" : "false") + "\"\n\t\t\t\t\t\tdata-age-group=\"" + this.seats[0].ageGroup + "\n\t\t\t\t\t\tdata-gender=\"" + this.seats[0].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[0] ? this.seats[0].name : "Stroke") + "\n\n\t\t\t\t</div>\n\n\n\n\t\t\t\t" + (this.seatCount == 4 || this.seatCount == 8 ? "\n\t\t\t\t<div class=\"droppable\"\n\t\t\t\t" + (!!this.seats[1] ? "\n\t\t\t\t\tdata-id=\"" + this.seats[1].id + "\" \n\t\t\t\t\tdata-name=\"" + this.seats[1].name + "\"\n\t\t\t\t\tdata-novice=\"" + (this.seats[1].novice ? "true" : "false") + "\"\n\t\t\t\t\tdata-age-group=\"" + this.seats[1].ageGroup + "\n\t\t\t\t\tdata-gender=\"" + this.seats[1].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[1] ? this.seats[1].name : "2 Seat") + "\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"droppable\"\n\t\t\t\t" + (!!this.seats[2] ? "\n\t\t\t\t\tdata-id=\"" + this.seats[2].id + "\" \n\t\t\t\t\tdata-name=\"" + this.seats[2].name + "\"\n\t\t\t\t\tdata-novice=\"" + (this.seats[2].novice ? "true" : "false") + "\"\n\t\t\t\t\tdata-age-group=\"" + this.seats[2].ageGroup + "\n\t\t\t\t\tdata-gender=\"" + this.seats[2].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[2] ? this.seats[2].name : "3 Seat") + "\n\t\t\t\t</div>\n\n\t\t\t\t" : "") + "\n\n\t\t\t\t" + (this.seatCount == 8 ? "\n\t\t\t\t<div class=\"droppable\"\n\t\t\t\t" + (!!this.seats[3] ? "\n\t\t\t\t\tdata-id=\"" + this.seats[3].id + "\" \n\t\t\t\t\tdata-name=\"" + this.seats[3].name + "\"\n\t\t\t\t\tdata-novice=\"" + (this.seats[3].novice ? "true" : "false") + "\"\n\t\t\t\t\tdata-age-group=\"" + this.seats[3].ageGroup + "\n\t\t\t\t\tdata-gender=\"" + this.seats[3].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[3] ? this.seats[3].name : "4 Seat") + "\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"droppable\"\n\t\t\t\t" + (!!this.seats[4] ? "\n\t\t\t\t\tdata-id=\"" + this.seats[4].id + "\" \n\t\t\t\t\tdata-name=\"" + this.seats[4].name + "\"\n\t\t\t\t\tdata-novice=\"" + (this.seats[4].novice ? "true" : "false") + "\"\n\t\t\t\t\tdata-age-group=\"" + this.seats[4].ageGroup + "\n\t\t\t\t\tdata-gender=\"" + this.seats[4].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[4] ? this.seats[4].name : "5 Seat") + "\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"droppable\"\n\t\t\t\t" + (!!this.seats[5] ? "\n\t\t\t\t\tdata-id=\"" + this.seats[5].id + "\" \n\t\t\t\t\tdata-name=\"" + this.seats[5].name + "\"\n\t\t\t\t\tdata-novice=\"" + (this.seats[5].novice ? "true" : "false") + "\"\n\t\t\t\t\tdata-age-group=\"" + this.seats[5].ageGroup + "\n\t\t\t\t\tdata-gender=\"" + this.seats[5].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[5] ? this.seats[5].name : "6 Seat") + "\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"droppable\"\n\t\t\t\t" + (!!this.seats[6] ? "\n\t\t\t\t\tdata-id=\"" + this.seats[6].id + "\" \n\t\t\t\t\tdata-name=\"" + this.seats[6].name + "\"\n\t\t\t\t\tdata-novice=\"" + (this.seats[6].novice ? "true" : "false") + "\"\n\t\t\t\t\tdata-age-group=\"" + this.seats[6].ageGroup + "\n\t\t\t\t\tdata-gender=\"" + this.seats[6].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[6] ? this.seats[6].name : "7 Seat") + "\n\t\t\t\t</div>\n\t\t\t\t" : "") + " \n\n\t\t\t\t" + ((this.seatCount == 2 || this.seatCount == 4 || this.seatCount == 8) && this.coxed ? "\n\t\t\t\t\t<div class=\"droppable\"\n\t\t\t\t\t" + (!!this.seats[this.seatCount - 2] ? "\n\t\t\t\t\t\tdata-id=\"" + this.seats[this.seatCount - 2].id + "\" \n\t\t\t\t\t\tdata-name=\"" + this.seats[this.seatCount - 2].name + "\"\n\t\t\t\t\t\tdata-novice=\"" + (this.seats[this.seatCount - 2].novice ? "true" : "false") + "\"\n\t\t\t\t\t\tdata-age-group=\"" + this.seats[this.seatCount - 2].ageGroup + "\n\t\t\t\t\t\tdata-gender=\"" + this.seats[this.seatCount - 2].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[this.seatCount - 2] ? this.seats[this.seatCount - 2].name : "Bow") + "\n\n\t\t\t\t\t</div>\n\t\t\t\t" : "") + "\n\n\t\t\t\t" + ((this.seatCount == 2 || this.seatCount == 4 || this.seatCount == 8) && !this.coxed ? "\n\t\t\t\t\t<div class=\"droppable\"\n\t\t\t\t\t" + (!!this.seats[this.seatCount - 1] ? "\n\t\t\t\t\t\tdata-id=\"" + this.seats[this.seatCount - 1].id + "\" \n\t\t\t\t\t\tdata-name=\"" + this.seats[this.seatCount - 1].name + "\"\n\t\t\t\t\t\tdata-novice=\"" + (this.seats[this.seatCount - 1].novice ? "true" : "false") + "\"\n\t\t\t\t\t\tdata-age-group=\"" + this.seats[this.seatCount - 1].ageGroup + "\n\t\t\t\t\t\tdata-gender=\"" + this.seats[this.seatCount - 1].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[this.seatCount - 1] ? this.seats[this.seatCount - 1].name : "Bow") + "\n\n\t\t\t\t\t</div>\n\t\t\t\t" : "") + "\n\n\n\t\t\t\t" + (this.coxed ? "<div class=\"separator\"> - </div>\n\t\t\t\t\n\t\t\t\t\t<div class=\"droppable\"\n\t\t\t\t\t" + (!!this.seats[this.seatCount - 1] ? "\n\t\t\t\t\t\tdata-id=\"" + this.seats[this.seatCount - 1].id + "\" \n\t\t\t\t\t\tdata-name=\"" + this.seats[this.seatCount - 1].name + "\"\n\t\t\t\t\t\tdata-novice=\"" + (this.seats[this.seatCount - 1].novice ? "true" : "false") + "\"\n\t\t\t\t\t\tdata-age-group=\"" + this.seats[this.seatCount - 1].ageGroup + "\n\t\t\t\t\t\tdata-gender=\"" + this.seats[this.seatCount - 1].gender + "\"\n\t\t\t\t\t" : "") + ">\n\n\t\t\t\t\t" + (!!this.seats[this.seatCount - 1] ? this.seats[this.seatCount - 1].name : "Cox") + "\n\n\t\t\t\t\t</div>\n\n\t\t\t\t" : "") + "\n\t\t\t</div>\n\t\t";
    tmp.querySelectorAll('div.droppable').forEach(function (val, index) {
      if (_this.seats[index] != undefined) {
        val.innerHTML = "\n\t\t\t\t\t<span class=\"name\">" + _this.seats[index].name + "</span>\n\t\t\t\t";
      }

      val.setAttribute("draggable", "true");

      val.ondrop = function (ev) {
        ev.preventDefault();
        var member;

        if (val.hasAttribute("data-id")) {
          window.sessionStorage.setItem("returningCrewMember", val.getAttribute("data-id"));

          _this.parentElement.dispatchEvent(new Event("returningCrewMember"));

          console.log("SESSION STORAGE SET");
        }

        try {
          // console.log("GOT CREW MEMBER", JSON.parse(window.sessionStorage.getItem("draggedItem")));
          console.log("GOT CREW MEMBER", JSON.parse(ev.dataTransfer.getData("data"))); // member = JSON.parse(window.sessionStorage.getItem("draggedItem")) as CrewMember;

          member = JSON.parse(ev.dataTransfer.getData("data"));
        } catch (e) {
          console.error("JSON.parse Failed", e, ev.dataTransfer.getData("data"));
          return;
        }

        val.setAttribute("data-id", member.id.toString());
        val.setAttribute("data-age-group", member.ageGroup);
        val.setAttribute("data-name", member.name);
        val.setAttribute("data-novice", member.novice ? "true" : "false");
        val.setAttribute("data-gender", member.gender);
        val.setAttribute("data-default", val.innerHTML);
        val.innerHTML = "\n\t\t\t\t\t<span class=\"name\">" + member.name + "</span>\n\t\t\t\t";
        _this.seats[index] = member;
        window.sessionStorage.setItem("acceptedCrewMember", val.getAttribute("data-id"));

        _this.parentElement.dispatchEvent(new Event("acceptedCrewMember"));

        console.log("SESSION STORAGE SET");

        _this.save(); // ev.target.innerHTML =

      };

      val.ondragover = function (ev) {
        ev.preventDefault();
      };

      val.ondragenter = function () {
        val.classList.add("hovered");
      };

      val.ondragleave = function () {
        val.classList.remove("hovered");
      };

      val.onclick = function () {
        // ev.dataTransfer.setData("data", JSON.stringify(this.seats[index]));
        window.sessionStorage.setItem("returningCrewMember", val.getAttribute("data-id"));

        _this.parentElement.dispatchEvent(new Event("returningCrewMember"));

        console.log("SESSION STORAGE SET"); // BRUH MOMENT

        _this.seats[index] = undefined;
        val.removeAttribute("data-id");
        val.removeAttribute("data-age-group");
        val.removeAttribute("data-name");
        val.removeAttribute("data-novice");
        val.removeAttribute("data-gender");
        val.innerHTML = val.getAttribute("data-default");

        _this.save();
      };
    });
    this.masterElement = tmp;
    this.initInputs();
  };

  return CrewEditorItem;
}();

exports.CrewEditorItem = CrewEditorItem;
},{}],"crew-editor.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrewEditor = void 0;

var CrewEditorItem_1 = require("./components/CrewEditorItem");

var CrewEditor =
/** @class */
function () {
  /**
   * Constructor of the Crew Editor Class
   *
   * @param querySelector The css selector for the point for which this should attach to
   */
  function CrewEditor(querySelector) {
    var _this = this;

    this.crews = [];
    this.usedCrewMembers = [];

    try {
      this.mainPoint = document.querySelector(querySelector);
      this.table = this.mainPoint.querySelector("table");
      this.editor = this.mainPoint.querySelector(".editor");
      this.fab = this.mainPoint.querySelector("div.fab");
      this.fabSelect = this.mainPoint.querySelector("div.selector");
      this.fabSelectButtons = [this.fabSelect.querySelector(".single"), this.fabSelect.querySelector(".double"), this.fabSelect.querySelector(".coxless-quad"), this.fabSelect.querySelector(".coxed-quad"), this.fabSelect.querySelector(".octi")]; // this.crews = [];

      this.loadCrewMembers();
      this.loadAllCrews();

      if (this.crews.length <= 0) {
        this.editor.innerHTML = "\n\t\t\t\t\t<div class=\"empty-container\">\n\t\t\t\t\t\t<h1 class=\"empty\">Click the + to make a crew</h1>\n\t\t\t\t\t</div>\n\t\t\t\t";
      } else {
        this.renderAllCrews();
      }

      this.editor.addEventListener('returningCrewMember', function () {
        console.log("RETURNING CREW MEMBER EVENT CAUGHT");

        _this.removeMemberFromUsedList(parseInt(window.sessionStorage.getItem("returningCrewMember")));

        window.sessionStorage.removeItem("returningCrewMember");
      });
      this.editor.addEventListener("acceptedCrewMember", function () {
        console.log("ACCEPTED CREW MEMBER EVENT CAUGHT");

        _this.addMemberToUsedList(parseInt(window.sessionStorage.getItem("acceptedCrewMember")));

        window.sessionStorage.removeItem("acceptedCrewMember");
      });
      this.editor.addEventListener("save", function () {
        console.log("SAVE EVENT CAUGHT");

        _this.saveAllCrews();
      });
      window.addEventListener('crewMembersEdited', function () {
        _this.loadCrewMembers();
      });
      this.fabSelectButtons.forEach(function (val, index) {
        val.onclick = function () {
          var buttonCrewSizeValue;
          var coxed = false;

          switch (index) {
            case 0:
              buttonCrewSizeValue = 1;
              break;

            case 1:
              buttonCrewSizeValue = 2;
              break;

            case 2:
              buttonCrewSizeValue = 4;
              break;

            case 3:
              buttonCrewSizeValue = 4;
              coxed = true;
              break;

            case 4:
              buttonCrewSizeValue = 8;
              coxed = true;
              break;

            default:
              break;
          }

          if (buttonCrewSizeValue == undefined) return;

          _this.crews.push(new CrewEditorItem_1.CrewEditorItem({
            parent: _this.editor,
            config: {
              size: buttonCrewSizeValue,
              coxed: coxed
            }
          }));

          _this.saveAllCrews();

          _this.renderAllCrews();
        };
      });
      this.fab.addEventListener('click', function () {
        if (_this.fab.innerHTML == "+") {
          _this.fabSelect.classList.toggle('hidden', false);

          _this.fab.innerHTML = "-";
        } else {
          _this.fabSelect.classList.toggle('hidden', true);

          _this.fab.innerHTML = "+";
        }
      });
      console.log("Crew Editor: Initialised Successfully");
    } catch (e) {
      console.error(e);
      throw new Error("Crew Editor: An Error Occured");
    }
  }
  /**
   * Renders the crews to the screen
   */


  CrewEditor.prototype.renderAllCrews = function () {
    var _this = this;

    this.editor.innerHTML = "";
    this.crews.forEach(function (val) {
      val.render();

      _this.editor.appendChild(val.masterElement);
    });
  };
  /**
   * Saves all crews to localstorage
   */


  CrewEditor.prototype.saveAllCrews = function () {
    window.localStorage.removeItem("crews");
    var serialisedOject = [];
    this.crews.forEach(function (val) {
      serialisedOject.push(val.serialise());
    });
    window.localStorage.setItem("crews", btoa(JSON.stringify(serialisedOject)));
  };
  /**
   * Loads the crews from the localstorage
   */


  CrewEditor.prototype.loadAllCrews = function () {
    // throw Error("Not Implemented");
    var _this = this;

    if (!window.localStorage.getItem("crews")) return;
    console.log(JSON.parse(atob(window.localStorage.getItem("crews"))));
    this.crews = [];
    var decodedLocalStorage = JSON.parse(atob(window.localStorage.getItem("crews")));
    decodedLocalStorage.forEach(function (val) {
      if (val.boatName == undefined) val.boatName = "";
      if (val.coachName == undefined) val.coachName = "";
      if (val.crewType == undefined) val.crewType = "";
      if (val.oars == undefined) val.oars = "";
      val.seats.forEach(function (val) {
        if (val == null || val == undefined) return;

        _this.usedCrewMembers.push(val.id.toString());
      });

      _this.crews.push(new CrewEditorItem_1.CrewEditorItem({
        parent: _this.editor,
        serialisedForm: val
      }));
    });
    this.insertDataIntoTable();
    this.renderAllCrews();
  };
  /**
   * Congrats mate :), you just made maadi
   *
   * @param id Crew Member ID of the crew member to add
   */


  CrewEditor.prototype.addMemberToUsedList = function (id) {
    if (this.usedCrewMembers.indexOf(id + "") == -1) this.usedCrewMembers.push(id.toString());
    this.insertDataIntoTable();
    console.log(this.usedCrewMembers);
  };
  /**
   * Congrats retard, if this function is called on you, youve been kicked form a crew :)
   *
   * @param id Crew Member Id of the crew member to remove
   */


  CrewEditor.prototype.removeMemberFromUsedList = function (id) {
    var tmp = [];
    this.usedCrewMembers.forEach(function (val) {
      if (val != id.toString()) {
        tmp.push(val);
      }
    });
    this.usedCrewMembers = tmp;
    this.insertDataIntoTable();
    console.log(this.usedCrewMembers);
  };
  /**
   * Returns the index in this.data of an element with the specified id
   *
   * @param id The id of the element you'd like to find the index of
   * @returns the index in this.data of the element with the id or `undefined` if not found
   */


  CrewEditor.prototype.getIndexOfID = function (id) {
    var i = -1;
    if (id < 0) console.error("ID IS LESS THAN 0");
    this.crewMembers.forEach(function (val, index) {
      if (val.id == id) {
        i = index;
        return i;
      }
    });
    console.error("CANNOT FIND INDEX OF CREW MEMBER", id);
    return -1;
  };
  /**
   * Scuffed function that checks if a crew member is in use, prevents stupid shit
   *
   * @param id The ID of the member you are chcking for
   * @returns whether the member is already on the list (in use)
   */


  CrewEditor.prototype.usedMembersListContains = function (id) {
    // console.log(this.usedCrewMembers);
    var tmp = false;

    try {
      this.usedCrewMembers.forEach(function (val) {
        if (val == id.toString()) {
          tmp = true;
        }
      });
    } catch (e) {
      console.error(e);
      return false;
    }

    return tmp;
  };
  /**
   * Put data from list to table
   */


  CrewEditor.prototype.insertDataIntoTable = function () {
    // for (let i: number = 1; i < this.table.rows.length; i++) {
    // 	try {
    // 		this.table.deleteRow(i);
    // 	} catch (e) {
    // 		console.warn(e);
    // 	}
    // }
    var _this = this;

    this.table.innerHTML = "\n\t\t\t<tr class=\"header\">\n\t\t\t\t<th>Gender/Age Group</th>\n\t\t\t\t<th class=\"big\">Name</th>\n\t\t\t</tr>\n\t\t"; // this.sort(this.crewMembers);

    var filtered = [];
    this.crewMembers.forEach(function (member) {
      if (!_this.usedCrewMembers.includes(member.id.toString())) {
        filtered.push(member);
      }
    });

    var _loop_1 = function _loop_1(i) {
      var val = filtered[i]; // if (val == undefined) return;

      if (this_1.usedMembersListContains(val.id)) {
        console.log(val, "CONTAINS", val.id);
      } else {
        var row = this_1.table.insertRow();
        row.innerHTML = "\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<span class=\"material-icons\">drag_indicator</span>\n\t\t\t\t\t\t<span class=\"separator\"></span>\n\t\t\t\t\t\t<span class=\"gender\">" + val.gender + "</span>\n\t\t\t\t\t\t<span class=\"separator\">/</span>\n\t\t\t\t\t\t<span>" + val.ageGroup + " " + (val.novice ? "Novice" : "") + "</span>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td class=\"big\">\n\t\t\t\t\t\t" + val.name + "\n\t\t\t\t\t</td>\n\t\t\t\t";
        row.setAttribute("draggable", "true");
        row.setAttribute("data-id", val.id.toString()); // row.setAttribute("data-index", i.toString());
        // row.ondragstart = (ev:DragEvent) => {
        // 	ev.preventDefault();
        // }

        row.ondragstart = function (ev) {
          ev.dataTransfer.setData("data", JSON.stringify(val)); // window.sessionStorage.setItem("draggedItem", JSON.stringify(val));
        }; // console.log("SUCCESSFULLY RENDERED ROW FOR", val.id);

      }
    };

    var this_1 = this; // filtered = this.sort(filtered);
    // console.log("FILTERED LIST LENGTH", filtered.length);

    for (var i = 0; i < filtered.length; i++) {
      _loop_1(i);
    }
  };
  /**
   * Load Crew members
   */


  CrewEditor.prototype.loadCrewMembers = function () {
    if (localStorage.getItem('crewMembers') != null) {
      this.crewMembers = JSON.parse(atob(localStorage.getItem('crewMembers')));
    } else {
      this.crewMembers = [];
    } // this.sort(this.crewMembers);


    this.insertDataIntoTable();
  };

  return CrewEditor;
}();

exports.CrewEditor = CrewEditor;
},{"./components/CrewEditorItem":"components/CrewEditorItem.ts"}],"crew-display.ts":[function(require,module,exports) {
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


function navigateClass(pathClass, wrapper, indicator, updateCallback) {
  // const pagesById = [
  // 	document.querySelector("#crew-display"),
  // 	document.querySelector("#crew-editor"),
  // 	document.querySelector("#member-editor")
  // ];
  if (pathClass == activeRouteClass) return;
  wrapper.classList.remove("member-editor", "crew-editor", "crew-display");
  indicator.classList.remove("member-editor", "crew-editor", "crew-display");
  wrapper.classList.add(pathClass);
  indicator.classList.add(pathClass);
  activeRouteClass = pathClass; // pagesById.forEach((val) => {
  // 	console.log(val);
  // 	if (val.id != pathClass) {
  // 		val.classList.add("hidden");
  // 	} else if (val.id == pathClass) {
  // 		val.classList.remove("hidden");
  // 	}
  // });

  if (!!updateCallback) {
    updateCallback();
  }
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
  var main, indicator; // if (!('import' in document.createElement('link'))) {
  // 	console.warn("HTML IMPORT NOT ENABLED");
  // }
  // window.onstorage = (() => { console.log(window.localStorage) });

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
    memberEditor = new member_editor_1.MemberEditor(".page#member-editor");
    crewEditor = new crew_editor_1.CrewEditor(".page#crew-editor");
    crewDisplay = new crew_display_1.CrewDisplay(".page#crew-display");
  } catch (error) {
    console.error("An Error Occured", error);
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
},{"./member-editor":"member-editor.ts","./crew-editor":"crew-editor.ts","./crew-display":"crew-display.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60688" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=app.c61986b1.js.map