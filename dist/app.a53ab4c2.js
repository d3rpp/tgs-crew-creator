parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UL96":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CrewMember=void 0;var e=function(){function e(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];if(1==e.length)this.fromInterface(e[0]);else{if(5!=e.length)throw new Error("Crew Member incorrectly initialised");this.fromValues(e[0],e[1],e[2],e[3],e[4])}}return e.prototype.fromInterface=function(e){this.id=e.id,this.name=e.name,this.gender=e.gender,this.novice=e.novice,this.ageGroup=e.ageGroup},e.prototype.fromValues=function(e,r,t,i,o){this.id=e,this.name=r,this.gender=t,this.novice=o,this.ageGroup=i},e}();exports.CrewMember=e;
},{}],"BzrR":[function(require,module,exports) {
"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.MemberEditor=void 0;var e=require("./types"),r=function(){function r(t){var e=this;this.testAgeGroups=["U15","U16","U17","U18"],this.index=-1,this.buffer={id:-1,name:"",gender:"",ageGroup:"",novice:void 0};try{this.mainPoint=document.querySelector(t)}catch(r){throw new Error("Member Editor: MainPoint not found")}try{this.table=this.mainPoint.querySelector("table"),this.editor=this.mainPoint.querySelector(".editor"),this.viewer=this.mainPoint.querySelector(".viewer"),this.name=this.editor.querySelector("input.nameInput"),this.name.addEventListener("input",function(){e.buffer.name=e.name.value,e.updateViewer()}),this.ageGroupSelect=this.editor.querySelector("select.age-group"),this.ageGroupSelect.addEventListener("input",function(){e.buffer.ageGroup=e.ageGroupSelect.value,e.updateViewer()}),this.genderSelect=this.editor.querySelector("select.gender"),this.genderSelect.addEventListener("input",function(){e.buffer.gender=e.genderSelect.value,e.updateViewer()}),this.noviceSwitch=this.editor.querySelector(".novice"),this.noviceSwitch.addEventListener("change",function(){e.buffer.novice=e.noviceSwitch.checked,e.updateViewer()}),this.clearButton=this.editor.querySelector(".buttons button.clear"),this.clearButton.addEventListener("mouseup",function(){e.resetBuffer(),e.updateInputForm(),e.updateViewer()}),this.submitButton=this.editor.querySelector(".buttons button.submit"),this.submitButton.addEventListener("mouseup",function(){e.confirmAndSubmitDataFromForm()||alert("There was an error"),e.resetBuffer(),e.updateViewer()})}catch(r){throw new Error("Member Editor: Element(s) missing")}try{null==localStorage.getItem("crewMembers")?this.initTestData():this.load(),this.sort(this.data)}catch(r){throw console.error(r),new Error("Member Editor: Failed when loading stuff or getting test data")}this.insertDataIntoTable(),this.updateViewer(),console.info("Member Editor: Initialised Successfully")}return r.prototype.testRandomNameGenerator=function(t){return Math.random().toString(36).substr(2,t)},r.prototype.dumpBuffer=function(){console.warn("CURRENT BUFFER IN MEMBER EDITOR",this.buffer)},r.prototype.idIsUsedforCrewMember=function(t){for(var e=!1,r=0;r<this.data.length;r++)this.data[r].id==t&&(e=!0);return e},r.prototype.setupButtons=function(){var t=this;this.mainPoint.querySelectorAll(".actions").forEach(function(e){e.querySelectorAll("button").forEach(function(e){e.classList.contains("edit")?e.addEventListener("click",function(){t.dumpBuffer(),t.buffer.id=+e.getAttribute("data-id"),t.pushInputToBuffer(),t.loadDataIntoInputForm(+e.getAttribute("data-index")),t.dumpBuffer()}):e.classList.contains("delete")&&(t.resetBuffer(),t.updateInputForm(),e.addEventListener("click",function(){var r=t.data[+e.getAttribute("data-index")];confirm("are you sure you'd like to delete "+r.name)&&(t.data.splice(+e.getAttribute("data-index"),1),t.save(),t.insertDataIntoTable())}))})})},r.prototype.validateBuffer=function(){return""==this.buffer.name||null==this.buffer.name||null==this.buffer.name?(this._val="name",this.dumpBuffer(),!1):this.buffer.ageGroup?"M"!=this.buffer.gender&&"F"!=this.buffer.gender?(this._val="gender",this.dumpBuffer(),!1):1==this.buffer.novice||0==this.buffer.novice||(this.dumpBuffer(),!1):(this._val="ageGroup",this.dumpBuffer(),!1)},r.prototype.updateViewer=function(){this.viewer.innerHTML=(this.buffer.gender?this.buffer.gender:"Gender")+" | "+(this.buffer.ageGroup?this.buffer.ageGroup:"Age Group")+" "+(this.buffer.novice?"Novice":"")+" | "+(this.buffer.name?this.buffer.name:"Name")},r.prototype.loadDataIntoInputForm=function(t){this.name.value=this.data[t].name,this.noviceSwitch.checked=this.data[t].novice,this.ageGroupSelect.value=this.data[t].ageGroup,this.genderSelect.value=this.data[t].gender,this.pushInputToBuffer(),this.submitButton.innerHTML="Update"},r.prototype.resetBuffer=function(){this.buffer.name="",this.buffer.ageGroup="",this.buffer.gender="",this.buffer.id=-1,this.buffer.novice=!1,this.updateInputForm(),this.updateViewer()},r.prototype.updateInputForm=function(){this.name.value=this.buffer.name?this.buffer.name:"",this.ageGroupSelect.value=this.buffer.ageGroup?this.buffer.ageGroup:"",this.genderSelect.value=this.buffer.gender?this.buffer.gender:"",this.noviceSwitch.checked=!!this.buffer.novice&&this.buffer.novice},r.prototype.initTestData=function(){this.data=[];for(var t=0;t<100;t++)this.addCrewMember({name:this.testRandomNameGenerator(Math.floor(7*Math.random())+5),gender:Math.round(Math.random())?"M":"F",ageGroup:this.testAgeGroups[Math.floor(4*Math.random())],novice:!!Math.round(Math.random()),id:this.createUID()})},r.prototype.pushInputToBuffer=function(){this.buffer.name=this.name.value,this.buffer.ageGroup=this.ageGroupSelect.value,this.buffer.gender=this.genderSelect.value,this.buffer.novice=this.noviceSwitch.checked},r.prototype.getIndexOfID=function(t){var e=-1;return t<0?null:(this.data.some(function(r,i){return r.id==t&&(e=i,!0)}),e)},r.prototype.createUID=function(){for(var e=function(t){if(!r.data.some(function(e){return e.id==t}))return{value:t}},r=this,i=0;i<1e4;i++){var n=e(i);if("object"===t(n))return n.value}},r.prototype.confirmAndSubmitDataFromForm=function(){if(!this.validateBuffer())return console.error("Error In ",this._val),this.dumpBuffer(),!1;if(-1==this.buffer.id){if(!confirm("Are you sure that you'd like to add "+this.buffer.gender+" "+this.buffer.ageGroup+(this.buffer.novice?" Novice":"")+" named "+this.buffer.name))return!1;this.buffer.id=this.createUID(),this.addCrewMember(this.buffer),this.save()}else{if(!confirm("Are you sure that you'd like to update "+this.buffer.gender+" "+this.buffer.ageGroup+(this.buffer.novice?" Novice":"")+" named "+this.buffer.name))return!1;var t=this.getIndexOfID(this.buffer.id);this.data[t]=new e.CrewMember(this.buffer),this.save()}return this.submitButton.innerHTML="Save",this.insertDataIntoTable(),!0},r.prototype.addCrewMember=function(t){this.idIsUsedforCrewMember(t.id)?this.data[this.getIndexOfID(t.id)]=new e.CrewMember(t):this.data.push(new e.CrewMember(t)),this.save()},r.prototype.sort=function(t){var e=["U15","U16","U17","U18"];return t.sort(function(t,e){return"M"==t.gender&&"F"==e.gender?-1:"F"==t.gender&&"M"==e.gender?1:t.gender==e.gender?0:void 0}),t.sort(function(t,e){return t.novice&&!e.novice?1:!t.novice&&e.novice?-1:0}),t.sort(function(t,r){return e.indexOf(r.ageGroup)-e.indexOf(t.ageGroup)}),t},r.prototype.save=function(){this.sort(this.data),localStorage.setItem("crewMembers",btoa(JSON.stringify(this.data))),window.dispatchEvent(new Event("crewMembersEdited"))},r.prototype.load=function(){null!=localStorage.getItem("crewMembers")?this.data=JSON.parse(atob(localStorage.getItem("crewMembers"))):this.data=[],this.save()},r.prototype.insertDataIntoTable=function(){var t=this;this.clearTable(),this.data.forEach(function(e,r){t.table.insertRow().innerHTML="\n\t\t\t\t<td>"+e.gender+"</td>\n\t\t\t\t<td>"+e.ageGroup+" "+(e.novice?"Novice":"")+'</td>\n\t\t\t\t<td class="big">'+e.name+'</td>\n\t\t\t\t<td class="actions">\n\t\t\t\t\t<button class="edit material-icons" data-index="'+r+'" data-id="'+e.id+'">edit</button>\n\t\t\t\t\t<button class="delete material-icons" data-index="'+r+'" data-id="'+e.id+'">delete</button>\n\t\t\t\t</td>\n\t\t\t\n\t\t\t'}),this.setupButtons()},r.prototype.clearTable=function(){this.table.innerHTML='\n\t\t\t<tr class="header">\n\t\t\t\t<th>Gender</th>\n\t\t\t\t<th>Age Group</th>\n\t\t\t\t<th class="big">Name</th>\n\t\t\t\t<th>Actions</th>\n\t\t\t</tr>\n\t\t'},r}();exports.MemberEditor=r;
},{"./types":"UL96"}],"Dmci":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CrewEditorItem=void 0;var t=function(){function t(t){this.coachName="",this.crewName="",this.boatName="",this.oars="",this.seatCount=0,this.currentError=void 0,this.currentWarning=void 0,t.serialisedForm?(this.parentElement=t.parent,this.deserialise(t.serialisedForm)):t.config?this.fromParentAndConfig(t.parent,t.config):console.error("Unable to Construct Crew Member Editor")}return t.prototype.save=function(){this.parentElement.dispatchEvent(new Event("save"))},t.prototype.fromParentAndConfig=function(t,e){this.masterElement=document.createElement("div"),this.parentElement=t,this.seatCount=e.size,this.coxed=e.coxed,this.seats=new Array(this.seatCount+(this.coxed?1:0)),this.seats.fill(void 0)},t.prototype.deserialise=function(t){switch(this.masterElement=document.createElement("div"),t.seats.length){case 1:this.seatCount=1,this.coxed=!1;break;case 2:this.seatCount=2,this.coxed=!1;break;case 4:this.seatCount=4,this.coxed=!1;break;case 5:this.seatCount=4,this.coxed=!0;break;case 9:this.seatCount=8,this.coxed=!0}this.seats=t.seats,this.boatName=t.boatName,this.crewName=t.crewType,this.oars=t.oars,this.coachName=t.coachName},t.prototype.serialise=function(){return{seats:this.seats?this.seats:[],coachName:this.coachName?this.coachName:"",boatName:this.boatName?this.boatName:"",crewType:this.crewName?this.crewName:"",oars:this.oars?this.oars:""}},t.prototype.validate=function(){var t=this;this.currentError=void 0,this.currentWarning=void 0;var e=/(M|W|G|B) (U|N)((1)(5|6|7|8)) ((1|2|4|8)X?(\+|-)?)/;if(""==this.crewName.trim())return this.currentError="No Crew Name",!1;if(!this.crewName.trim().toUpperCase().match(e))return this.currentError="Invalid Name",!1;if(""==this.coachName.trim())return this.currentError="No Coach",!1;if(""==this.boatName.trim())return this.currentError="No Boat Allocated",!1;if(""==this.oars.trim())return this.currentError="No Oars",!1;if(this.seats.forEach(function(e){if(null==e)return t.currentError="Not All Seats Filled",!1}),this.crewName.trim().toUpperCase().match(e)){var a,s,n,i=void 0,r=this.crewName.trim().toUpperCase();if(r.match(/(8X?\+)/))i=8;else if(r.match(/(4X?(\+|-))/))i=4;else if(r.match(/(2X?-?)/))i=2;else{if(!r.match(/(1X-?)/))return this.currentError="Invalid Name",!1;i=1}if(i!=this.seatCount)return this.currentError="Crew Type does not match size",!1;if(r.match(/((U|N)18)/))a="U18";else if(r.match(/((U|N)17)/))a="U17";else if(r.match(/((U|N)16)/))a="U16";else{if(!r.match(/((U|N)15)/))return this.currentError="Invalid Name",!1;a="U15"}if(r.match(/(M|B)/))s="M";else{if(!r.match(/(G|W)/))return this.currentError="Invalid Name",!1;s="F"}if(r.match(/(N)(1)(5|6|7|8)/))n=!0;else{if(!r.match(/(U)(1)(5|6|7|8)/))return this.currentError="Invalid Name",!1;n=!1}this.seats.forEach(function(e,a){var s=!1;a==t.seatCount&&t.coxed&&(s=!0),!n||e.novice||s||(t.currentWarning="Non-Novices in Novice Boat")}),this.seats.forEach(function(e,n){var i=!1;n==t.seatCount&&t.coxed&&(i=!0),null==e||null==e||i||(e.ageGroup!=a?t.currentWarning="Mixed Age Groups Detected":e.gender!=s&&(t.currentWarning="Mixed Genders Selected"))})}return!0},t.prototype.updateErrorsAndWarnings=function(){null!=this.currentError?this.errorBox.innerHTML='<span style="color:#ff5555;">Error: '+this.currentError+"</span>":null!=this.currentWarning?this.errorBox.innerHTML='<span style="color:#ffff55;">Warning: '+this.currentWarning+"</span>":this.errorBox.innerHTML='<span style="color:#55ff55;">This is a Valid Crew</span>'},t.prototype.initInputs=function(){var t=this,e=this.masterElement;try{this._coachNameInput=e.querySelector("input.coach"),this._crewNameInput=e.querySelector("input.crew-type"),this._boatNameInput=e.querySelector("input.boat"),this._oarsInput=e.querySelector("input.oars"),this.errorBox=e.querySelector(".errors"),this.deleteButton=e.querySelector(".deleteButton span")}catch(a){console.error("Error Initialising Inputs on Crew Editor Item",a)}this.validate(),this.updateErrorsAndWarnings();try{this._coachNameInput.addEventListener("input",function(){t.coachName=t._coachNameInput.value,t.validate(),t.updateErrorsAndWarnings(),t.save()}),this._crewNameInput.addEventListener("input",function(){t.crewName=t._crewNameInput.value,t.validate(),t.updateErrorsAndWarnings(),t.save()}),this._boatNameInput.addEventListener("input",function(){t.boatName=t._boatNameInput.value,t.validate(),t.updateErrorsAndWarnings(),t.save()}),this._oarsInput.addEventListener("input",function(){t.oars=t._oarsInput.value,t.validate(),t.updateErrorsAndWarnings(),t.save()}),this.deleteButton.addEventListener("click",function(){confirm("Are you sure you would like to delete this "+t.crewName)&&(window.sessionStorage.setItem("crewToDelete",t.masterElement.getAttribute("data-index")),t.parentElement.dispatchEvent(new Event("delete")))})}catch(a){console.error("Error Initilising Event Listeners on Crew Editor Item Inputs",a)}},t.prototype.render=function(){var t,e,a=this,s=document.createElement("div");switch(s.classList.add("item"),this.seatCount){case 1:s.classList.add("single"),t="single";break;case 2:s.classList.add("double"),t="double";break;case 4:s.classList.add("quad"),t="quad";break;case 8:s.classList.add("octuple"),t="octuple"}e=this.coxed?"coxed":"coxless",s.innerHTML='\n\t\t\t<div class="topRow">\n\t\t\t\t<div class="input crew-type">\n\t\t\t\t\t<input type="text" required class="crew-type" value="'+(this.crewName?this.crewName:"")+'">\n\t\t\t\t\t<span class="highlight"></span>\n\t\t\t\t\t<span class="bar"></span>\n\t\t\t\t\t<label>Crew Type</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="input oars">\n\t\t\t\t\t<input type="text" required class="oars" value="'+(this.oars?this.oars:"")+'">\n\t\t\t\t\t<span class="highlight"></span>\n\t\t\t\t\t<span class="bar"></span>\n\t\t\t\t\t<label>Oars</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="middleRow">\n\t\t\t\t<div class="input coach">\n\t\t\t\t\t<input type="text" required class="coach" value="'+(this.coachName?this.coachName:"")+'">\n\t\t\t\t\t<span class="highlight"></span>\n\t\t\t\t\t<span class="bar"></span>\n\t\t\t\t\t<label>Coach</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="input boat">\n\t\t\t\t\t<input type="text" required class="boat" value="'+(this.boatName?this.boatName:"")+'">\n\t\t\t\t\t<span class="highlight"></span>\n\t\t\t\t\t<span class="bar"></span>\n\t\t\t\t\t<label>Boat Name</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="names '+t+" "+e+'">\n\n\t\t\t\x3c!-- Every Boat has a Stroke Seat, even  singles --\x3e\n\n\t\t\t\t<div class="droppable"\n\t\t\t\t\t'+(this.seats[0]?'\n\t\t\t\t\t\tdata-id="'+this.seats[0].id+'" \n\t\t\t\t\t\tdata-name="'+this.seats[0].name+'"\n\t\t\t\t\t\tdata-novice="'+(this.seats[0].novice?"true":"false")+'"\n\t\t\t\t\t\tdata-age-group="'+this.seats[0].ageGroup+'\n\t\t\t\t\t\tdata-gender="'+this.seats[0].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t</div>\n\n\n\n\t\t\t\t"+(4==this.seatCount||8==this.seatCount?'\n\t\t\t\t<div class="droppable"\n\t\t\t\t'+(this.seats[1]?'\n\t\t\t\t\tdata-id="'+this.seats[1].id+'" \n\t\t\t\t\tdata-name="'+this.seats[1].name+'"\n\t\t\t\t\tdata-novice="'+(this.seats[1].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.seats[1].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.seats[1].gender+'"\n\t\t\t\t\t':"")+'>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="droppable"\n\t\t\t\t'+(this.seats[2]?'\n\t\t\t\t\tdata-id="'+this.seats[2].id+'" \n\t\t\t\t\tdata-name="'+this.seats[2].name+'"\n\t\t\t\t\tdata-novice="'+(this.seats[2].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.seats[2].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.seats[2].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t</div>\n\t\t\t\t":"")+"\n\n\t\t\t\t"+(8==this.seatCount?'\n\n\t\t\t\t<div class="droppable"\n\t\t\t\t'+(this.seats[3]?'\n\t\t\t\t\tdata-id="'+this.seats[3].id+'" \n\t\t\t\t\tdata-name="'+this.seats[3].name+'"\n\t\t\t\t\tdata-novice="'+(this.seats[3].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.seats[3].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.seats[3].gender+'"\n\t\t\t\t\t':"")+'>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="droppable"\n\t\t\t\t'+(this.seats[4]?'\n\t\t\t\t\tdata-id="'+this.seats[4].id+'" \n\t\t\t\t\tdata-name="'+this.seats[4].name+'"\n\t\t\t\t\tdata-novice="'+(this.seats[4].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.seats[4].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.seats[4].gender+'"\n\t\t\t\t\t':"")+'>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class="droppable"\n\t\t\t\t'+(this.seats[5]?'\n\t\t\t\t\tdata-id="'+this.seats[5].id+'" \n\t\t\t\t\tdata-name="'+this.seats[5].name+'"\n\t\t\t\t\tdata-novice="'+(this.seats[5].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.seats[5].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.seats[5].gender+'"\n\t\t\t\t\t':"")+'>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class="droppable"\n\t\t\t\t'+(this.seats[6]?'\n\t\t\t\t\tdata-id="'+this.seats[6].id+'" \n\t\t\t\t\tdata-name="'+this.seats[6].name+'"\n\t\t\t\t\tdata-novice="'+(this.seats[6].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.seats[6].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.seats[6].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t</div>\n\t\t\t\t":"")+" \n\n\t\t\t\t"+(2!=this.seatCount&&4!=this.seatCount&&8!=this.seatCount||!this.coxed?"":'\n\t\t\t\t\t<div class="droppable"\n\t\t\t\t\t'+(this.seats[this.seatCount-2]?'\n\t\t\t\t\t\tdata-id="'+this.seats[this.seatCount-2].id+'" \n\t\t\t\t\t\tdata-name="'+this.seats[this.seatCount-2].name+'"\n\t\t\t\t\t\tdata-novice="'+(this.seats[this.seatCount-2].novice?"true":"false")+'"\n\t\t\t\t\t\tdata-age-group="'+this.seats[this.seatCount-2].ageGroup+'\n\t\t\t\t\t\tdata-gender="'+this.seats[this.seatCount-2].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t</div>\n\t\t\t\t")+"\n\n\t\t\t\t"+(2!=this.seatCount&&4!=this.seatCount&&8!=this.seatCount||this.coxed?"":'\n\t\t\t\t\t<div class="droppable"\n\t\t\t\t\t'+(this.seats[this.seatCount-1]?'\n\t\t\t\t\t\tdata-id="'+this.seats[this.seatCount-1].id+'" \n\t\t\t\t\t\tdata-name="'+this.seats[this.seatCount-1].name+'"\n\t\t\t\t\t\tdata-novice="'+(this.seats[this.seatCount-1].novice?"true":"false")+'"\n\t\t\t\t\t\tdata-age-group="'+this.seats[this.seatCount-1].ageGroup+'\n\t\t\t\t\t\tdata-gender="'+this.seats[this.seatCount-1].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t</div>\n\t\t\t\t")+"\n\n\n\t\t\t\t"+(this.coxed?'<div class="separator"> - </div>\n\t\t\t\t\n\t\t\t\t\t<div class="droppable"\n\t\t\t\t\t'+(this.seats[this.seatCount-1]?'\n\t\t\t\t\t\tdata-id="'+this.seats[this.seatCount-1].id+'" \n\t\t\t\t\t\tdata-name="'+this.seats[this.seatCount-1].name+'"\n\t\t\t\t\t\tdata-novice="'+(this.seats[this.seatCount-1].novice?"true":"false")+'"\n\t\t\t\t\t\tdata-age-group="'+this.seats[this.seatCount-1].ageGroup+'\n\t\t\t\t\t\tdata-gender="'+this.seats[this.seatCount-1].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t</div>\n\t\t\t\t":"")+'\n\t\t\t</div>\n\t\t\t<div class="bottomRow">\n\t\t\t\t<div class="errors">\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<span style="flex: 1 1 auto;"> </span>\n\t\t\t\t<div class="deleteButton">\n\t\t\t\t\t<span class="material-icons">delete</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t',s.querySelectorAll("div.droppable").forEach(function(t,e){null!=a.seats[e]&&(t.innerHTML='\n\t\t\t\t\t<span class="name">'+a.seats[e].name+'</span>\n\t\t\t\t\t&nbsp;\n\t\t\t\t\t<span class="info">'+a.seats[e].gender+" "+a.seats[e].ageGroup+" "+(a.seats[e].novice?"N":"")+"</span>\n\t\t\t\t"),t.setAttribute("draggable","true"),t.ondrop=function(s){var n;s.preventDefault(),t.hasAttribute("data-id")&&(window.sessionStorage.setItem("returningCrewMember",t.getAttribute("data-id")),a.parentElement.dispatchEvent(new Event("returningCrewMember")));try{n=JSON.parse(s.dataTransfer.getData("data"))}catch(i){return void console.error("JSON.parse Failed",i,s.dataTransfer.getData("data"))}t.setAttribute("data-id",n.id.toString()),t.setAttribute("data-age-group",n.ageGroup),t.setAttribute("data-name",n.name),t.setAttribute("data-novice",n.novice?"true":"false"),t.setAttribute("data-gender",n.gender),t.setAttribute("data-default",t.innerHTML),t.innerHTML='\n\t\t\t\t\t<span class="name">'+n.name+'</span>&nbsp;\n\t\t\t\t\t<span class="info">'+n.gender+" "+n.ageGroup+" "+(n.novice?"N":"")+"</span>\n\t\t\t\t",a.seats[e]=n,window.sessionStorage.setItem("acceptedCrewMember",t.getAttribute("data-id")),a.parentElement.dispatchEvent(new Event("acceptedCrewMember")),a.validate(),a.updateErrorsAndWarnings(),a.save()},t.ondragover=function(t){t.preventDefault()},t.ondragenter=function(){t.classList.add("hovered")},t.ondragleave=function(){t.classList.remove("hovered")},t.onclick=function(){window.sessionStorage.setItem("returningCrewMember",t.getAttribute("data-id")),a.parentElement.dispatchEvent(new Event("returningCrewMember")),a.seats[e]=void 0,t.removeAttribute("data-id"),t.removeAttribute("data-age-group"),t.removeAttribute("data-name"),t.removeAttribute("data-novice"),t.removeAttribute("data-gender"),t.innerHTML=t.getAttribute("data-default"),a.validate(),a.updateErrorsAndWarnings(),a.save()}}),this.masterElement=s,this.initInputs(),this.updateErrorsAndWarnings()},t}();exports.CrewEditorItem=t;
},{}],"SHsH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CrewEditor=void 0;var t=require("./components/CrewEditorItem"),e=function(){function e(e){var r=this;this.crews=[],this.usedCrewMembers=[];try{this.mainPoint=document.querySelector(e),this.table=this.mainPoint.querySelector("table"),this.editor=this.mainPoint.querySelector(".editor"),this.fab=this.mainPoint.querySelector("div.fab"),this.fabSelect=this.mainPoint.querySelector("div.selector"),this.fabSelectButtons=[this.fabSelect.querySelector(".single"),this.fabSelect.querySelector(".double"),this.fabSelect.querySelector(".coxless-quad"),this.fabSelect.querySelector(".coxed-quad"),this.fabSelect.querySelector(".octi")],this.loadCrewMembers(),this.loadAllCrews(),this.crews.length<=0?this.editor.innerHTML='\n\t\t\t\t\t<div class="empty-container">\n\t\t\t\t\t\t<h1 class="empty">Click the + to make a crew</h1>\n\t\t\t\t\t</div>\n\t\t\t\t':this.renderAllCrews(),this.editor.addEventListener("returningCrewMember",function(){r.removeMemberFromUsedList(parseInt(window.sessionStorage.getItem("returningCrewMember"))),window.sessionStorage.removeItem("returningCrewMember")}),this.editor.addEventListener("acceptedCrewMember",function(){r.addMemberToUsedList(parseInt(window.sessionStorage.getItem("acceptedCrewMember"))),window.sessionStorage.removeItem("acceptedCrewMember")}),this.editor.addEventListener("save",function(){r.saveAllCrews()}),this.editor.addEventListener("delete",function(){r.deleteCrew(parseInt(window.sessionStorage.getItem("crewToDelete"))),window.sessionStorage.removeItem("crewToDelete"),r.saveAllCrews(),r.renderAllCrews(),r.insertDataIntoTable()}),window.addEventListener("crewMembersEdited",function(){r.loadCrewMembers()}),this.fabSelectButtons.forEach(function(e,s){e.onclick=function(){var e,n=!1;switch(s){case 0:e=1;break;case 1:e=2;break;case 2:e=4;break;case 3:e=4,n=!0;break;case 4:e=8,n=!0}null!=e&&(r.crews.push(new t.CrewEditorItem({parent:r.editor,config:{size:e,coxed:n}})),r.saveAllCrews(),r.renderAllCrews())}}),this.fab.addEventListener("click",function(){"+"==r.fab.innerHTML?(r.fabSelect.classList.toggle("hidden",!1),r.fab.innerHTML="-"):(r.fabSelect.classList.toggle("hidden",!0),r.fab.innerHTML="+")}),console.info("Crew Editor: Initialised Successfully")}catch(s){throw console.error(s),new Error("Crew Editor: An Error Occured")}}return e.prototype.renderAllCrews=function(){var t=this;this.editor.innerHTML="";try{if(0==this.crews.length||!this.crews)return void(this.editor.innerHTML='\n\t\t\t\t\t<div class="empty-container">\n\t\t\t\t\t\t<h1 class="empty">Click the + to make a crew</h1>\n\t\t\t\t\t</div>\n\t\t\t\t')}catch(e){return void(this.editor.innerHTML='\n\t\t\t\t<div class="empty-container">\n\t\t\t\t\t<h1 class="empty">Click the + to make a crew</h1>\n\t\t\t\t</div>\n\t\t\t')}this.crews.forEach(function(e,r){e.render(),e.masterElement.setAttribute("data-index",r.toString()),t.editor.appendChild(e.masterElement)}),this.saveAllCrews()},e.prototype.deleteCrew=function(t){var e=[],r=[],s=[];this.crews.forEach(function(s,n){n==t?s.seats.forEach(function(t){null!=t&&null!=t&&r.push(t.id.toString())}):e.push(s)}),this.usedCrewMembers.forEach(function(t){r.includes(t)||s.push(t)}),this.crews=e,this.usedCrewMembers=s,this.saveAllCrews()},e.prototype.saveAllCrews=function(){window.localStorage.removeItem("crews");var t=[];this.crews.forEach(function(e){t.push(e.serialise())}),window.localStorage.setItem("crews",btoa(JSON.stringify(t))),window.dispatchEvent(new Event("storage"))},e.prototype.loadAllCrews=function(){var e=this;window.localStorage.getItem("crews")&&(this.crews=[],JSON.parse(atob(window.localStorage.getItem("crews"))).forEach(function(r){null==r.boatName&&(r.boatName=""),null==r.coachName&&(r.coachName=""),null==r.crewType&&(r.crewType=""),null==r.oars&&(r.oars=""),r.seats.forEach(function(t){null!=t&&null!=t&&e.usedCrewMembers.push(t.id.toString())}),e.crews.push(new t.CrewEditorItem({parent:e.editor,serialisedForm:r}))}),this.insertDataIntoTable(),this.renderAllCrews())},e.prototype.addMemberToUsedList=function(t){-1==this.usedCrewMembers.indexOf(t+"")&&this.usedCrewMembers.push(t.toString()),this.insertDataIntoTable()},e.prototype.removeMemberFromUsedList=function(t){var e=[];this.usedCrewMembers.forEach(function(r){r!=t.toString()&&e.push(r)}),this.usedCrewMembers=e,this.insertDataIntoTable()},e.prototype.getIndexOfID=function(t){return t<0&&console.error("ID IS LESS THAN 0"),this.crewMembers.forEach(function(e,r){if(e.id==t)return r}),console.error("CANNOT FIND INDEX OF CREW MEMBER",t),-1},e.prototype.usedMembersListContains=function(t){var e=!1;try{this.usedCrewMembers.forEach(function(r){r==t.toString()&&(e=!0)})}catch(r){return console.error(r),!1}return e},e.prototype.insertDataIntoTable=function(){var t=this;this.table.innerHTML='\n\t\t\t<tr class="header">\n\t\t\t\t<th>Gender/Age Group</th>\n\t\t\t\t<th class="big">Name</th>\n\t\t\t</tr>\n\t\t';var e=[];this.crewMembers.forEach(function(r){t.usedCrewMembers.includes(r.id.toString())||e.push(r)});for(var r=function(t){var r=e[t];if(s.usedCrewMembers.includes(r.id.toString()));else{var n=s.table.insertRow();n.innerHTML='\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<span class="material-icons">drag_indicator</span>\n\t\t\t\t\t\t<span class="separator"></span>\n\t\t\t\t\t\t<span class="gender">'+r.gender+'</span>\n\t\t\t\t\t\t<span class="separator">/</span>\n\t\t\t\t\t\t<span>'+r.ageGroup+" "+(r.novice?"Novice":"")+'</span>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td class="big">\n\t\t\t\t\t\t'+r.name+"\n\t\t\t\t\t</td>\n\t\t\t\t",n.setAttribute("draggable","true"),n.setAttribute("data-id",r.id.toString()),n.ondragstart=function(t){t.dataTransfer.setData("data",JSON.stringify(r))}}},s=this,n=0;n<e.length;n++)r(n)},e.prototype.loadCrewMembers=function(){null!=localStorage.getItem("crewMembers")?this.crewMembers=JSON.parse(atob(localStorage.getItem("crewMembers"))):this.crewMembers=[],this.insertDataIntoTable()},e}();exports.CrewEditor=e;
},{"./components/CrewEditorItem":"Dmci"}],"wl7E":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CrewDisplayItem=void 0;var t=function(){function t(t){this.mainElement=document.createElement("div"),this.crew=t,this.sizeString=this.calculateBoatSizeStringForRenderer()}return t.prototype.calculateBoatSizeStringForRenderer=function(){var t="";switch(this.crew.seats.length){case 1:t="single coxless",this.size=1,this.coxed=!1;break;case 2:t="double coxless",this.size=2,this.coxed=!1;break;case 4:t="quad coxless",this.size=4,this.coxed=!1;break;case 5:t="quad coxed",this.size=4,this.coxed=!0;break;case 9:t="octuple coxed",this.size=8,this.coxed=!0;break;default:throw new Error("INVALID CREW")}return t},t.prototype.render=function(){return this.mainElement.classList.add("item"),this.mainElement.innerHTML='\n\t\t\t<div class="left">\n\t\t\t\t<div class="header">\n\t\t\t\t\t<h1>'+this.crew.crewType.toUpperCase()+'</h1>\n\t\t\t\t</div>\n\t\t\t\t<div class="sep">hi</div>\n\t\t\t\t<div class="sub">\n\t\t\t\t\t<h2>Boat</h2>\n\t\t\t\t\t<span>'+this.crew.boatName+"</span>\n\t\t\t\t\t<h2>Coach</h2>\n\t\t\t\t\t<span>"+this.crew.coachName+"</span>\n\t\t\t\t\t<h2>Oars</h2>\n\t\t\t\t\t<span>"+this.crew.oars+'</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="right '+this.sizeString+'">\n\n\t\t\t\x3c!-- Every Boat has a Stroke Seat, even  singles --\x3e\n\n\t\t\t\t<div \n\t\t\t\t\t'+(this.crew.seats[0]?'\n\t\t\t\t\t\tdata-id="'+this.crew.seats[0].id+'" \n\t\t\t\t\t\tdata-name="'+this.crew.seats[0].name+'"\n\t\t\t\t\t\tdata-novice="'+(this.crew.seats[0].novice?"true":"false")+'"\n\t\t\t\t\t\tdata-age-group="'+this.crew.seats[0].ageGroup+'\n\t\t\t\t\t\tdata-gender="'+this.crew.seats[0].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[0]?""+this.crew.seats[0].name:"")+"\n\t\t\t\t</div>\n\n\n\n\t\t\t\t"+(4==this.size||8==this.size?"\n\t\t\t\t<div \n\t\t\t\t"+(this.crew.seats[1]?'\n\t\t\t\t\tdata-id="'+this.crew.seats[1].id+'" \n\t\t\t\t\tdata-name="'+this.crew.seats[1].name+'"\n\t\t\t\t\tdata-novice="'+(this.crew.seats[1].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.crew.seats[1].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.crew.seats[1].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[1]?""+this.crew.seats[1].name:"")+"\n\t\t\t\t</div>\n\n\t\t\t\t<div \n\t\t\t\t"+(this.crew.seats[2]?'\n\t\t\t\t\tdata-id="'+this.crew.seats[2].id+'" \n\t\t\t\t\tdata-name="'+this.crew.seats[2].name+'"\n\t\t\t\t\tdata-novice="'+(this.crew.seats[2].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.crew.seats[2].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.crew.seats[2].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[2]?""+this.crew.seats[2].name:"")+"\n\t\t\t\t</div>\n\t\t\t\t":"")+"\n\n\t\t\t\t"+(8==this.size?"\n\n\t\t\t\t<div \n\t\t\t\t"+(this.crew.seats[3]?'\n\t\t\t\t\tdata-id="'+this.crew.seats[3].id+'" \n\t\t\t\t\tdata-name="'+this.crew.seats[3].name+'"\n\t\t\t\t\tdata-novice="'+(this.crew.seats[3].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.crew.seats[3].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.crew.seats[3].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[3]?""+this.crew.seats[3].name:"")+"\n\t\t\t\t</div>\n\n\t\t\t\t<div \n\t\t\t\t"+(this.crew.seats[4]?'\n\t\t\t\t\tdata-id="'+this.crew.seats[4].id+'" \n\t\t\t\t\tdata-name="'+this.crew.seats[4].name+'"\n\t\t\t\t\tdata-novice="'+(this.crew.seats[4].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.crew.seats[4].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.crew.seats[4].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[4]?""+this.crew.seats[4].name:"")+"\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div \n\t\t\t\t"+(this.crew.seats[5]?'\n\t\t\t\t\tdata-id="'+this.crew.seats[5].id+'" \n\t\t\t\t\tdata-name="'+this.crew.seats[5].name+'"\n\t\t\t\t\tdata-novice="'+(this.crew.seats[5].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.crew.seats[5].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.crew.seats[5].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[5]?""+this.crew.seats[5].name:"")+"\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div \n\t\t\t\t"+(this.crew.seats[6]?'\n\t\t\t\t\tdata-id="'+this.crew.seats[6].id+'" \n\t\t\t\t\tdata-name="'+this.crew.seats[6].name+'"\n\t\t\t\t\tdata-novice="'+(this.crew.seats[6].novice?"true":"false")+'"\n\t\t\t\t\tdata-age-group="'+this.crew.seats[6].ageGroup+'\n\t\t\t\t\tdata-gender="'+this.crew.seats[6].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[6]?""+this.crew.seats[6].name:"")+"\n\t\t\t\t</div>\n\t\t\t\t":"")+" \n\n\t\t\t\t"+(2!=this.size&&4!=this.size&&8!=this.size||!this.coxed?"":"\n\t\t\t\t\t<div \n\t\t\t\t\t"+(this.crew.seats[this.size-2]?'\n\t\t\t\t\t\tdata-id="'+this.crew.seats[this.size-2].id+'" \n\t\t\t\t\t\tdata-name="'+this.crew.seats[this.size-2].name+'"\n\t\t\t\t\t\tdata-novice="'+(this.crew.seats[this.size-2].novice?"true":"false")+'"\n\t\t\t\t\t\tdata-age-group="'+this.crew.seats[this.size-2].ageGroup+'\n\t\t\t\t\t\tdata-gender="'+this.crew.seats[this.size-2].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[this.size-2]?""+this.crew.seats[this.size-2].name:"")+"\n\t\t\t\t</div>\n\t\t\t\t")+"\n\n\t\t\t\t"+(2!=this.size&&4!=this.size&&8!=this.size||this.coxed?"":"\n\t\t\t\t\t<div \n\t\t\t\t\t"+(this.crew.seats[this.size-1]?'\n\t\t\t\t\t\tdata-id="'+this.crew.seats[this.size-1].id+'" \n\t\t\t\t\t\tdata-name="'+this.crew.seats[this.size-1].name+'"\n\t\t\t\t\t\tdata-novice="'+(this.crew.seats[this.size-1].novice?"true":"false")+'"\n\t\t\t\t\t\tdata-age-group="'+this.crew.seats[this.size-1].ageGroup+'\n\t\t\t\t\t\tdata-gender="'+this.crew.seats[this.size-1].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[this.size-1]?""+this.crew.seats[this.size-1].name:"")+"\n\t\t\t\t</div>\n\t\t\t\t")+"\n\n\n\t\t\t\t"+(this.coxed?'<div class="separator"> - </div>\n\t\t\t\t\n\t\t\t\t\t<div \n\t\t\t\t\t'+(this.crew.seats[this.size-1]?'\n\t\t\t\t\t\tdata-id="'+this.crew.seats[this.size-1].id+'" \n\t\t\t\t\t\tdata-name="'+this.crew.seats[this.size-1].name+'"\n\t\t\t\t\t\tdata-novice="'+(this.crew.seats[this.size-1].novice?"true":"false")+'"\n\t\t\t\t\t\tdata-age-group="'+this.crew.seats[this.size-1].ageGroup+'\n\t\t\t\t\t\tdata-gender="'+this.crew.seats[this.size-1].gender+'"\n\t\t\t\t\t':"")+">\n\t\t\t\t\t"+(this.crew.seats[this.size-1]?""+this.crew.seats[this.size-1].name:"")+"\n\t\t\t\t</div>\n\t\t\t\t":"")+"\n\t\t\t\t</div>\n\n\t\t",this.mainElement},t}();exports.CrewDisplayItem=t;
},{}],"CDlC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CrewDisplay=void 0;var e=require("./components/CrewDisplayItem"),t=function(){function t(e){var t=this;this.items=[];try{this.mainPoint=document.querySelector(e)}catch(r){throw new Error("Crew Display: Unable to find master element for page")}window.addEventListener("storage",function(){t.loadCrews(),t.renderCrews(),console.log("updated",JSON.parse(atob(window.localStorage.getItem("crews"))))}),this.loadCrews(),this.renderCrews(),console.info("Crew Display: Initialised Successfuly")}return t.prototype.loadCrews=function(){JSON.parse(atob(window.localStorage.getItem("crews")))!=[]&&null!=JSON.parse(atob(window.localStorage.getItem("crews")))&&null!=JSON.parse(atob(window.localStorage.getItem("crews")))&&(this.crews=JSON.parse(atob(window.localStorage.getItem("crews"))))},t.prototype.renderCrews=function(){var t=this;console.log("RENDER CREW DISPLAY"),this.items=[],this.mainPoint.innerHTML='<div class="container"></div>';var r=this.mainPoint.querySelector(".container");this.crews.forEach(function(r){t.items.push(new e.CrewDisplayItem(r))}),this.items.forEach(function(e){r.appendChild(e.render())})},t}();exports.CrewDisplay=t;
},{"./components/CrewDisplayItem":"wl7E"}],"EVxB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,r,t,o,n,i=require("./member-editor"),a=require("./crew-editor"),c=require("./crew-display"),s=function(){return function(e,r){var t=this;this.routes=[],this.mode="hash",this.root="/",this.current="",this.add=function(e,r){return t.routes.push({path:e,callback:r}),t},this.remove=function(e){for(var r=0;r<t.routes.length;r+=1)if(t.routes[r].path===e)return t.routes.slice(r,1),t;return t},this.flush=function(){return t.routes=[],t},this.clearSlashes=function(e){return e.toString().replace(/\/$/,"").replace(/^\//,"")},this.getFragment=function(){var e="";if("history"===t.mode)e=(e=t.clearSlashes(decodeURI(window.location.pathname+window.location.search))).replace(/\?(.*)$/,""),e="/"!==t.root?e.replace(t.root,""):e;else{var r=window.location.href.match(/#(.*)$/);e=r?r[1]:""}return t.clearSlashes(e)},this.navigate=function(e){return void 0===e&&(e=""),"history"===t.mode?window.history.pushState(null,"",t.root+t.clearSlashes(e)):window.location.href=window.location.href.replace(/#(.*)$/,"")+"#"+e,t.current,t},this.listen=function(){clearInterval(t.globalInterval),t.globalInterval=setInterval(t.interval,50)},this.interval=function(){t.current!==t.getFragment()&&(t.current=t.getFragment(),t.routes.some(function(e){var r=t.current.match(e.path);return!!r&&(r.shift(),e.callback.apply({},r),r)}))},e.mode&&(this.mode=e.mode),e.root&&(this.root=e.root),r&&(this.routes=r),this.listen()}}();function l(r,t,o,n){r!=e&&(t.classList.remove("member-editor","crew-editor","crew-display"),o.classList.remove("member-editor","crew-editor","crew-display"),t.classList.add(r),o.classList.add(r),e=r,n&&n())}var u=function(){var e,u;try{if(e=document.querySelector("main.wrapper"),u=document.querySelector("span#indicator"),null==e||null==u)throw new Error("Good Job Retard")}catch(d){return console.error("You did it wrong, your IQ is: "+Math.floor(-100*Math.random())),void console.error({error:d})}try{t=new i.MemberEditor(".page#member-editor"),o=new a.CrewEditor(".page#crew-editor"),n=new c.CrewDisplay(".page#crew-display")}catch(d){console.error("An Error Occured",d)}r=new s({mode:"hash",root:"/"},[{path:"member-editor",callback:function(){return l("member-editor",e,u)}},{path:"crew-editor",callback:function(){return l("crew-editor",e,u)}},{path:"crew-display",callback:function(){return l("crew-display",e,u)}},{path:"",callback:function(){return l("member-editor",e,u)}}])};document.addEventListener("DOMContentLoaded",u);
},{"./member-editor":"BzrR","./crew-editor":"SHsH","./crew-display":"CDlC"}]},{},["EVxB"], null)
//# sourceMappingURL=app.a53ab4c2.js.map