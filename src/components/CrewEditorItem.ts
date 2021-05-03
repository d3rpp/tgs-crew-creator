
import { BoatSize, CrewMember } from "../types";

interface CrewEditorItemConfig {
	size: BoatSize;
	coxed: boolean;
}

// Warnings and Errors
// The Editor will refuse to save until all errors are cleared, but it will accept the data if there is just a warning;
// The Warnings just prevent coaches from accidental mistakes but sometimes mixed crews do happen during trainings so the crew will still save if this is the case
type currentErrorInEditor = "Not All Seats Filled" | "No Coach" | "No Crew Name" | "Invalid Name" | "No Oars" | "No Boat Allocated" | "";
type currentWarningInEditor = "Mixed Age Groups Detected" | "Mixed Genders Selected" | "";

/**
 * 	Serialised form of the Crew Editor Item class, holds only the data we need
 * 
 * 	 We can use the length of the seats array to infer the boat type, based on it length
 * 
 *	 |	1 - 1x 			|
 *	 |	2 - 2x / 2- 	|
 *	 |	4 - 4x- / 4- 	|
 *	 |	5 - 4x+ / 4+ 	|
 *	 |	8 - 8x+ / 8+ 	|
 *
 *	 this is all the possible combinations and it is not required in this
 *	 software to differentiate between sculling and sweeping
 */
interface CrewEditorSerialised {
	seats: CrewMember[];
	boatName: string;
	coachName: string;
	oars: string;
	crewType: string;
}


class CrewEditorItem {

	/**
	 * A Reference to this Item
	 */
	masterElement: HTMLElement;

	/**
	 * A Reference to the editor element, given by the parent class (Crew Editor)
	 */
	parentElement: HTMLElement;

	coachName: string = "";
	_coachNameInput: HTMLInputElement;

	crewName: string = "";
	_crewNameInput: HTMLInputElement;

	boatName: string = "";
	_boatNameInput: HTMLInputElement;

	oars: string = "";
	_oarsInput: HTMLInputElement;

	seatCount: BoatSize = 0;
	coxed: boolean;

	/**
	 * Yet To IMPLEMENT
	 * TODO: Implement this BS
	 */
	currentError: currentErrorInEditor | undefined = undefined;
	currentWarning: currentWarningInEditor | undefined = undefined;

	/**
	 * Seats, this thing has cause a LOT of problems but its fixed now
	 */
	seats: CrewMember[];

	/**
	 * MULTIPLE CONSTRUCTORS GANG
	 */

	constructor({ parent: HTMLElement, config: CrewEditorItemConfig })
	constructor({ parent: HTMLElement, serialisedForm: CrewEditorSerialised })

	/**
	 * 
	 * @param args The Arguments, can be one of 2 overflows
	 */
	constructor(args: any) {
		if (args.serialisedForm) {
			this.parentElement = args.parent
			this.deserialise(args.serialisedForm);
		} else if (args.config) {
			this.fromParentAndConfig(args.parent, args.config)
		} else {
			console.error("Unable to Construct Crew Member Editor");
		}
	}

	/**
	 * Tells the parent (Crew Editor Class) to save the crews,
	 * this happens a lot as this is saved in real time
	 */
	private save() {
		this.parentElement.dispatchEvent(new Event("save"));
	};

	/**
	 * This is when the CrewEditorItem is brand new, it sets everything up
	 * 
	 * @param parent parent element, probably not actually needed
	 * @param config The Config such as crew Size and whether or not there is a cox
	 */
	private fromParentAndConfig(parent: HTMLElement, config: CrewEditorItemConfig) {
		this.masterElement = document.createElement('div');

		this.parentElement = parent;

		this.seatCount = config.size;
		this.coxed = config.coxed

		this.seats = new Array<CrewMember>(this.seatCount + (this.coxed ? 1 : 0));

		this.seats.fill(undefined);
	}

	/**
	 * 	This is when the CrewEditorItem is being loaded as a result of the window.localStorage being existant for this
	 * 
	 * @param serialisedForm the Simplified form of this thing, used for more efficient storage
	 */
	private deserialise(serialisedForm: CrewEditorSerialised): void {
		this.masterElement = document.createElement('div');

		// We are inferring the seat count and cox from the length of the serialised form;
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

		this.boatName = serialisedForm.boatName;
		// this._boatNameInput.value = serialisedForm.boatName;

		this.crewName = serialisedForm.crewType;
		// this._crewNameInput.value = serialisedForm.crewType;

		this.oars = serialisedForm.oars;
		// this._oarsInput.value = serialisedForm.oars;

		this.coachName = serialisedForm.coachName;
		// this._coachNameInput.value = serialisedForm.coachName;
	}

	/**
	 * turns it from a class with functions to an interface with only the required data
	 * 
	 * @returns Simplified form of this class
	 */
	public serialise(): CrewEditorSerialised {

		// if (!this.validate()) return;

		let tmp: CrewEditorSerialised = {
			seats: this.seats ? this.seats : [],
			coachName: this.coachName ? this.coachName : "",
			boatName: this.boatName ? this.boatName : "",
			crewType: this.crewName ? this.crewName : "",
			oars: this.oars ? this.oars : ""
		};

		return tmp;
	}

	/**
	 * Returns true if this piece of sh*t is valid, NEVER TRUST USER INPUT
	 * 
	 * @returns Whether this piece of shit is valid
	 */
	private validate(): boolean {

		// MMMMMMMMMM REGEX
		let crewNameRegex = /(M|W|G|B) (U|N)((1)(5|6|7|8)) ((1|2|4|8)X?(\+|-))/;

		if (this.crewName == "") {
			this.currentError = "No Crew Name";
		}

		if (!this.crewName.toUpperCase().match(crewNameRegex)) {
			this.currentError = "Invalid Name"
			return false;
		}

		return true;
	}

	/**
	 * Initialises the inputs
	 */
	private initInputs(): void {
		let m = this.masterElement;

		try {
			this._coachNameInput = m.querySelector("input.coach");
			this._crewNameInput = m.querySelector("input.crew-type");
			this._boatNameInput = m.querySelector("input.boat");
			this._oarsInput = m.querySelector("input.oars");
		} catch (e: any) {
			console.error("Error Initialising Inputs on Crew Editor Item", e);
		}

		try {
			this._coachNameInput.addEventListener('input', () => {
				this.coachName = this._coachNameInput.value;
				this.save();
			});
			this._crewNameInput.addEventListener('input', () => {
				this.crewName = this._crewNameInput.value;
				this.save();
			});
			this._boatNameInput.addEventListener('input', () => {
				this.boatName = this._boatNameInput.value;
				this.save();
			});
			this._oarsInput.addEventListener('input', () => {
				this.oars = this._oarsInput.value;
				this.save();
			});
		} catch (e: any) {
			console.error("Error Initilising Event Listeners on Crew Editor Item Inputs", e);
		}
	}

	/**
	 * React Style Render Function, just works
	 */
	render() {

		let tmp: HTMLElement = document.createElement('div');

		tmp.classList.add("item");

		let sizeString: string;
		let coxString: string

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
			coxString = ("coxed");
		} else {
			coxString = ("coxless");
		}

		tmp.innerHTML = `
			<div class="topRow">
				<div class="input crew-type">
					<input type="text" required class="crew-type" value="${this.crewName ? this.crewName : ""}">
					<span class="highlight"></span>
					<span class="bar"></span>
					<label>Crew Type</label>
				</div>
				<div class="input oars">
					<input type="text" required class="oars" value="${this.oars ? this.oars : ""}">
					<span class="highlight"></span>
					<span class="bar"></span>
					<label>Oars</label>
				</div>
			</div>
			<div class="middleRow">
				<div class="input coach">
					<input type="text" required class="coach" value="${this.coachName ? this.coachName : ""}">
					<span class="highlight"></span>
					<span class="bar"></span>
					<label>Coach</label>
				</div>
				<div class="input boat">
					<input type="text" required class="boat" value="${this.boatName ? this.boatName : ""}">
					<span class="highlight"></span>
					<span class="bar"></span>
					<label>Boat Name</label>
				</div>
			</div>
			<div class="names ${sizeString} ${coxString}">

			<!-- Every Boat has a Stroke Seat -->

				<div class="droppable"
					${!!this.seats[0] ? `
						data-id="${this.seats[0].id}" 
						data-name="${this.seats[0].name}"
						data-novice="${this.seats[0].novice ? "true" : "false"}"
						data-age-group="${this.seats[0].ageGroup}
						data-gender="${this.seats[0].gender}"
					` : ``}>

					${!!this.seats[0] ? this.seats[0].name : "Stroke"}

				</div>



				${this.seatCount == 4 || this.seatCount == 8 ? `
				<div class="droppable"
				${!!this.seats[1] ? `
					data-id="${this.seats[1].id}" 
					data-name="${this.seats[1].name}"
					data-novice="${this.seats[1].novice ? "true" : "false"}"
					data-age-group="${this.seats[1].ageGroup}
					data-gender="${this.seats[1].gender}"
					`: ``}>

					${!!this.seats[1] ? this.seats[1].name : "2 Seat"}
				</div>

				<div class="droppable"
				${!!this.seats[2] ? `
					data-id="${this.seats[2].id}" 
					data-name="${this.seats[2].name}"
					data-novice="${this.seats[2].novice ? "true" : "false"}"
					data-age-group="${this.seats[2].ageGroup}
					data-gender="${this.seats[2].gender}"
					`: ``}>

					${!!this.seats[2] ? this.seats[2].name : "3 Seat"}
				</div>

				`: ``}

				${this.seatCount == 8 ? `
				<div class="droppable"
				${!!this.seats[3] ? `
					data-id="${this.seats[3].id}" 
					data-name="${this.seats[3].name}"
					data-novice="${this.seats[3].novice ? "true" : "false"}"
					data-age-group="${this.seats[3].ageGroup}
					data-gender="${this.seats[3].gender}"
					`: ``}>

					${!!this.seats[3] ? this.seats[3].name : "4 Seat"}
				</div>
				
				<div class="droppable"
				${!!this.seats[4] ? `
					data-id="${this.seats[4].id}" 
					data-name="${this.seats[4].name}"
					data-novice="${this.seats[4].novice ? "true" : "false"}"
					data-age-group="${this.seats[4].ageGroup}
					data-gender="${this.seats[4].gender}"
					`: ``}>

					${!!this.seats[4] ? this.seats[4].name : "5 Seat"}
				</div>
				
				<div class="droppable"
				${!!this.seats[5] ? `
					data-id="${this.seats[5].id}" 
					data-name="${this.seats[5].name}"
					data-novice="${this.seats[5].novice ? "true" : "false"}"
					data-age-group="${this.seats[5].ageGroup}
					data-gender="${this.seats[5].gender}"
					`: ``}>

					${!!this.seats[5] ? this.seats[5].name : "6 Seat"}
				</div>
				
				<div class="droppable"
				${!!this.seats[6] ? `
					data-id="${this.seats[6].id}" 
					data-name="${this.seats[6].name}"
					data-novice="${this.seats[6].novice ? "true" : "false"}"
					data-age-group="${this.seats[6].ageGroup}
					data-gender="${this.seats[6].gender}"
					`: ``}>

					${!!this.seats[6] ? this.seats[6].name : "7 Seat"}
				</div>
				`: ``} 

				${(this.seatCount == 2 || this.seatCount == 4 || this.seatCount == 8) && this.coxed ? `
					<div class="droppable"
					${!!this.seats[this.seatCount - 2] ? `
						data-id="${this.seats[this.seatCount - 2].id}" 
						data-name="${this.seats[this.seatCount - 2].name}"
						data-novice="${this.seats[this.seatCount - 2].novice ? "true" : "false"}"
						data-age-group="${this.seats[this.seatCount - 2].ageGroup}
						data-gender="${this.seats[this.seatCount - 2].gender}"
					` : ``}>

					${!!this.seats[this.seatCount - 2] ? this.seats[this.seatCount - 2].name : "Bow"}

					</div>
				` : ``}

				${(this.seatCount == 2 || this.seatCount == 4 || this.seatCount == 8) && !this.coxed ? `
					<div class="droppable"
					${!!this.seats[this.seatCount - 1] ? `
						data-id="${this.seats[this.seatCount - 1].id}" 
						data-name="${this.seats[this.seatCount - 1].name}"
						data-novice="${this.seats[this.seatCount - 1].novice ? "true" : "false"}"
						data-age-group="${this.seats[this.seatCount - 1].ageGroup}
						data-gender="${this.seats[this.seatCount - 1].gender}"
					` : ``}>

					${!!this.seats[this.seatCount - 1] ? this.seats[this.seatCount - 1].name : "Bow"}

					</div>
				` : ``}


				${this.coxed ? `<div class="separator"> - </div>
				
					<div class="droppable"
					${!!this.seats[this.seatCount - 1] ? `
						data-id="${this.seats[this.seatCount - 1].id}" 
						data-name="${this.seats[this.seatCount - 1].name}"
						data-novice="${this.seats[this.seatCount - 1].novice ? "true" : "false"}"
						data-age-group="${this.seats[this.seatCount - 1].ageGroup}
						data-gender="${this.seats[this.seatCount - 1].gender}"
					` : ``}>

					${!!this.seats[this.seatCount - 1] ? this.seats[this.seatCount - 1].name : "Cox"}

					</div>

				` : ``}
			</div>
		`;

		tmp.querySelectorAll('div.droppable').forEach((val: Element, index: number) => {

			if (this.seats[index] != undefined) {
				val.innerHTML = `
					<span class="name">${(this.seats[index].name)}</span>
				`;
			}

			val.setAttribute("draggable", "true");

			(val as HTMLElement).ondrop = (ev: DragEvent) => {
				ev.preventDefault();
				let member: CrewMember;

				if (val.hasAttribute("data-id")) {
					window.sessionStorage.setItem("returningCrewMember", val.getAttribute("data-id"));
					this.parentElement.dispatchEvent(new Event("returningCrewMember"));
					console.log("SESSION STORAGE SET");
				}

				try {

					// console.log("GOT CREW MEMBER", JSON.parse(window.sessionStorage.getItem("draggedItem")));
					console.log("GOT CREW MEMBER", JSON.parse(ev.dataTransfer.getData("data")));

					// member = JSON.parse(window.sessionStorage.getItem("draggedItem")) as CrewMember;
					member = JSON.parse(ev.dataTransfer.getData("data")) as CrewMember;
				} catch (e: any) {
					console.error("JSON.parse Failed", e, ev.dataTransfer.getData("data"));
					return;
				}

				val.setAttribute("data-id", member.id.toString());
				val.setAttribute("data-age-group", member.ageGroup);
				val.setAttribute("data-name", member.name);
				val.setAttribute("data-novice", member.novice ? "true" : "false");
				val.setAttribute("data-gender", member.gender);

				val.setAttribute("data-default", val.innerHTML);

				val.innerHTML = `
					<span class="name">${(member.name)}</span>
				`;

				this.seats[index] = member;

				window.sessionStorage.setItem("acceptedCrewMember", val.getAttribute("data-id")!);
				this.parentElement.dispatchEvent(new Event("acceptedCrewMember"))
				console.log("SESSION STORAGE SET");

				this.save();

				// ev.target.innerHTML =
			}

			(val as HTMLElement).ondragover = (ev: DragEvent) => {
				ev.preventDefault();
			}

			(val as HTMLElement).ondragenter = () => {
				val.classList.add("hovered");
			};

			(val as HTMLElement).ondragleave = () => {
				val.classList.remove("hovered")
			}

			(val as HTMLElement).onclick = () => {
				// ev.dataTransfer.setData("data", JSON.stringify(this.seats[index]));

				window.sessionStorage.setItem("returningCrewMember", val.getAttribute("data-id"));
				this.parentElement.dispatchEvent(new Event("returningCrewMember"));
				console.log("SESSION STORAGE SET");

				// BRUH MOMENT
				this.seats[index] = undefined;

				val.removeAttribute("data-id");
				val.removeAttribute("data-age-group");
				val.removeAttribute("data-name");
				val.removeAttribute("data-novice");
				val.removeAttribute("data-gender");

				val.innerHTML = val.getAttribute("data-default");

				this.save();
			}
		});

		this.masterElement = (tmp);

		this.initInputs();
	}
}

export { CrewEditorItem, CrewEditorSerialised }