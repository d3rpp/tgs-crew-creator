import { BoatSize, CrewMember } from "./types";
import { CrewEditorItem, CrewEditorSerialised } from './components/CrewEditorItem'
class CrewEditor {
	mainPoint: HTMLElement;

	table: HTMLTableElement;
	editor: HTMLElement;

	fab: HTMLElement;
	fabSelect: HTMLElement;

	fabSelectButtons: HTMLElement[];

	public crews: CrewEditorItem[] = [];

	public crewMembers!: CrewMember[];

	public usedCrewMembers: string[] = [];

	/**
	 * Constructor of the Crew Editor Class
	 * 
	 * @param querySelector The css selector for the point for which this should attach to
	 */
	constructor(querySelector: string) {
		try {
			this.mainPoint = document.querySelector(querySelector)!;
			this.table = this.mainPoint.querySelector("table")!;
			this.editor = this.mainPoint.querySelector(".editor")!;
			this.fab = this.mainPoint.querySelector("div.fab")!;
			this.fabSelect = this.mainPoint.querySelector("div.selector")!;

			this.fabSelectButtons = [
				this.fabSelect.querySelector(".single")!,
				this.fabSelect.querySelector(".double")!,
				this.fabSelect.querySelector(".coxless-quad")!,
				this.fabSelect.querySelector(".coxed-quad")!,
				this.fabSelect.querySelector(".octi")!
			];

			// this.crews = [];
			this.loadCrewMembers();
			this.loadAllCrews();

			if (this.crews.length <= 0) {
				this.editor.innerHTML = `
					<div class="empty-container">
						<h1 class="empty">Click the + to make a crew</h1>
					</div>
				`
			} else {
				this.renderAllCrews();
			}

			this.editor.addEventListener('returningCrewMember', () => {
				console.log("RETURNING CREW MEMBER EVENT CAUGHT");

				this.removeMemberFromUsedList(parseInt(window.sessionStorage.getItem("returningCrewMember")!));

				window.sessionStorage.removeItem("returningCrewMember");
			});

			this.editor.addEventListener("acceptedCrewMember", () => {
				console.log("ACCEPTED CREW MEMBER EVENT CAUGHT");

				this.addMemberToUsedList(parseInt(window.sessionStorage.getItem("acceptedCrewMember")!));

				window.sessionStorage.removeItem("acceptedCrewMember")
			});

			this.editor.addEventListener("save", () => {
				console.log("SAVE EVENT CAUGHT");
				this.saveAllCrews();
			});

			window.addEventListener('crewMembersEdited', () => {
				this.loadCrewMembers();
			});

			this.fabSelectButtons.forEach((val: HTMLElement, index: number) => {
				val.onclick = () => {
					let buttonCrewSizeValue: BoatSize;
					let coxed: boolean = false;
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
							break
						case 4:
							buttonCrewSizeValue = 8;
							coxed = true;
							break;
						default:
							break;
					}

					if (buttonCrewSizeValue == undefined) return;

					this.crews.push(new CrewEditorItem({ parent: this.editor, config: { size: buttonCrewSizeValue, coxed: coxed } }));
					this.saveAllCrews();
					this.renderAllCrews();
				}
			});

			this.fab.addEventListener('click', () => {

				if (this.fab.innerHTML == "+") {
					this.fabSelect.classList.toggle('hidden', false);
					this.fab.innerHTML = "-"
				} else {
					this.fabSelect.classList.toggle('hidden', true);
					this.fab.innerHTML = "+"
				}
			});


			console.log("Crew Editor: Initialised Successfully")
		} catch (e) {
			console.error(e);
			throw new Error("Crew Editor: An Error Occured");
		}
	}

	/**
	 * Renders the crews to the screen
	 */
	private renderAllCrews() {

		this.editor.innerHTML = ``;

		this.crews.forEach((val: CrewEditorItem) => {
			val.render();

			this.editor.appendChild(val.masterElement);
		});
	}

	/**
	 * Saves all crews to localstorage
	 */
	private saveAllCrews() {

		window.localStorage.removeItem("crews");

		let serialisedOject: CrewEditorSerialised[] = [];

		this.crews.forEach((val: CrewEditorItem) => {
			serialisedOject.push(val.serialise());
		});

		window.localStorage.setItem("crews", btoa(JSON.stringify(serialisedOject)));
	}

	/**
	 * Loads the crews from the localstorage
	 */
	private loadAllCrews() {
		// throw Error("Not Implemented");

		if (!window.localStorage.getItem("crews")) return;

		console.log(JSON.parse(atob(window.localStorage.getItem("crews"))));

		this.crews = [];
		let decodedLocalStorage = JSON.parse(atob(window.localStorage.getItem("crews"))) as CrewEditorSerialised[];

		decodedLocalStorage.forEach((val) => {
			if (val.boatName == undefined) val.boatName = "";
			if (val.coachName == undefined) val.coachName = "";
			if (val.crewType == undefined) val.crewType = "";
			if (val.oars == undefined) val.oars = "";

			val.seats.forEach((val: CrewMember | null | undefined) => {
				if (val == null || val == undefined) return;
				this.usedCrewMembers.push(val.id.toString());
			})

			this.crews.push(new CrewEditorItem({ parent: this.editor, serialisedForm: val }));
		});

		this.insertDataIntoTable();
		this.renderAllCrews();
	}

	/**
	 * Congrats mate :), you just made maadi
	 * 
	 * @param id Crew Member ID of the crew member to add
	 */
	private addMemberToUsedList(id: number) {
		if (this.usedCrewMembers.indexOf(id + "") == -1) this.usedCrewMembers.push(id.toString());

		this.insertDataIntoTable();

		console.log(this.usedCrewMembers);
	}

	/**
	 * Congrats retard, if this function is called on you, youve been kicked form a crew :)
	 * 
	 * @param id Crew Member Id of the crew member to remove
	 */
	private removeMemberFromUsedList(id: number) {
		let tmp: string[] = [];

		this.usedCrewMembers.forEach((val) => {
			if (val != id.toString()) {
				tmp.push(val);
			}
		})

		this.usedCrewMembers = tmp;

		this.insertDataIntoTable();

		console.log(this.usedCrewMembers);

	}

	/**
	 * Returns the index in this.data of an element with the specified id
	 * 
	 * @param id The id of the element you'd like to find the index of
	 * @returns the index in this.data of the element with the id or `undefined` if not found
	 */
	private getIndexOfID(id: number): number {
		let i: number = -1;

		if (id < 0) console.error("ID IS LESS THAN 0");

		this.crewMembers.forEach((val, index) => {
			if (val.id == id) {
				i = index;
				return i;
			}
		});

		console.error("CANNOT FIND INDEX OF CREW MEMBER", id);

		return -1;
	}

	/**
	 * Scuffed function that checks if a crew member is in use, prevents stupid shit
	 * 
	 * @param id The ID of the member you are chcking for
	 * @returns whether the member is already on the list (in use)
	 */
	private usedMembersListContains(id: number): boolean {

		// console.log(this.usedCrewMembers);

		let tmp = false;

		try {
			this.usedCrewMembers.forEach((val: string) => {
				if (val == id.toString()) {
					tmp = true;
				}
			})
		} catch (e: any) {
			console.error(e);
			return false;
		}

		return tmp;
	}

	/**
	 * Put data from list to table
	 */
	private insertDataIntoTable() {
		// for (let i: number = 1; i < this.table.rows.length; i++) {
		// 	try {
		// 		this.table.deleteRow(i);
		// 	} catch (e) {
		// 		console.warn(e);
		// 	}
		// }

		this.table.innerHTML = `
			<tr class="header">
				<th>Gender/Age Group</th>
				<th class="big">Name</th>
			</tr>
		`;

		// this.sort(this.crewMembers);

		let filtered: CrewMember[] = [];

		this.crewMembers.forEach((member: CrewMember) => {
			if (!this.usedCrewMembers.includes(member.id.toString())) {
				filtered.push(member);
			}
		})

		// filtered = this.sort(filtered);

		// console.log("FILTERED LIST LENGTH", filtered.length);

		for (let i = 0; i < filtered.length; i++) {

			let val = filtered[i];

			// if (val == undefined) return;
			if (this.usedMembersListContains(val.id)) {
				console.log(val, "CONTAINS", val.id);
			} else {
				let row = this.table.insertRow();

				row.innerHTML = (`
					<td>
						<span class="material-icons">drag_indicator</span>
						<span class="separator"></span>
						<span class="gender">${(val.gender)}</span>
						<span class="separator">/</span>
						<span>${(val.ageGroup)} ${val.novice ? "Novice" : ""}</span>
					</td>
					<td class="big">
						${(val.name)}
					</td>
				`);

				row.setAttribute("draggable", "true");
				row.setAttribute("data-id", val.id.toString());
				// row.setAttribute("data-index", i.toString());

				// row.ondragstart = (ev:DragEvent) => {
				// 	ev.preventDefault();
				// }

				row.ondragstart = (ev: DragEvent) => {
					ev.dataTransfer.setData("data", JSON.stringify(val));
					// window.sessionStorage.setItem("draggedItem", JSON.stringify(val));
				}

				// console.log("SUCCESSFULLY RENDERED ROW FOR", val.id);
			}

			// console.warn("FAILED TO RENDER ROW FOR", val.id);
		}
	}

	/**
	 * Load Crew members
	 */
	private loadCrewMembers() {
		if (localStorage.getItem('crewMembers') != null) {
			this.crewMembers = JSON.parse(atob(localStorage.getItem('crewMembers')!));
		} else {
			this.crewMembers = [];
		}

		// this.sort(this.crewMembers);
		this.insertDataIntoTable();
	}
}

export { CrewEditor }