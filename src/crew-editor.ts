import { CrewMember } from "./types";
import { sanitize } from 'dompurify';

class CrewEditor {
	mainPoint: HTMLElement;

	table: HTMLTableElement;
	editor: HTMLElement;

	crewMembers: CrewMember[];

	usedCrewMembers: CrewMember[];

	constructor(querySelector: string) {
		try {
			this.mainPoint = document.querySelector(querySelector)!;
			this.table = this.mainPoint.querySelector("table");
			this.editor = this.mainPoint.querySelector(".left");

			this.loadCrewMembers();

			window.addEventListener("storage", (ev: StorageEvent) => {
				if (ev.key == "crewMembers") {
					this.loadCrewMembers();
				}
			});

			console.log("Crew Editor: Initialised Successfully")
		} catch (e) {
			console.error(e);
			throw new Error("Crew Editor: An Error Occured");
		}
	}

	/**
	 * Put data from list to table
	 */
	private insertDataIntoTable() {
		for (let i: number = 1; i < this.table.rows.length - 1; i++) {
			try {
				this.table.deleteRow(i);
			} catch (e) {
				console.warn(e);
			}
		}

		console.log(this.crewMembers);

		this.crewMembers.forEach((val: CrewMember, i: number) => {
			let row = this.table.insertRow();

			row.innerHTML = (`
				<td>
					<span class="material-icons">drag_indicator</span>
					<span class="separator"></span>
					<span class="gender">${sanitize(val.gender)}</span>
					<span class="separator">/</span>
					<span>${sanitize(val.ageGroup)} ${val.novice ? "Novice" : ""}</span>
				</td>
				<td class="big">
					${sanitize(val.name)}
				</td>
			`);

			row.setAttribute("draggable", "true");
			row.setAttribute("data-id", val.id.toString());
			row.setAttribute("data-index", i.toString());
		});

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

		this.insertDataIntoTable();
	}
}

export { CrewEditor }