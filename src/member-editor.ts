import { AgeGroup, CrewMember, CrewMemberInterface, Gender } from "./types";


class MemberEditor {
	mainPoint: HTMLElement;

	table: HTMLTableElement;

	data!: Array<CrewMember>;

	private testAgeGroups = ["U15", "U16", "U17", "U18"]

	private testRandomNameGenerator(length: number) {
		let res = '';

		// Stolen from stack overflow ;)
		for (let i = 0; i < length; i++) {
			const random = Math.floor(Math.random() * 27);
			res += String.fromCharCode(97 + random);
		};
		return res;
	}

	constructor(querySelector: string) {
		try {
			this.mainPoint = document.querySelector(querySelector)!;

			this.table = this.mainPoint.querySelector("table")!;

			this.load();

			// this.initTestData();               

			this.insertDataIntoTable();

			console.log("Member Editor: Initialised Successfully");
		} catch (e) {
			throw new Error("Member Editor: " + e);
		}
	}

	private idIsUsedforCrewMember(id: number): boolean {

		let tmp: boolean = false;

		for (let i: number = 0; i < this.data.length; i++) {
			if (this.data[i].id == id) {
				tmp = true
			}
		}

		return tmp;
	}

	initTestData() {
		this.data = [];

		for (var i: number = 0; i < 100; i++) {
			this.addCrewMember({
				name: this.testRandomNameGenerator(Math.floor(Math.random() * 7) + 5),
				gender: (!!(Math.round(Math.random())) ? "M" : "F") as Gender,
				ageGroup: this.testAgeGroups[(Math.floor(Math.random() * 4))] as AgeGroup,
				novice: !!(Math.round(Math.random()))
			});
		}
	}


	private addCrewMember(member: CrewMemberInterface) {
		let id: number;

		do {
			id = Math.floor(Math.random() * 100000)
		} while (this.idIsUsedforCrewMember(id));

		member.id = id;

		this.data.push(new CrewMember(member))
		this.save();
	}

	private save() {
		localStorage.setItem("crewMembers", btoa(JSON.stringify(this.data)));
	}

	private load() {
		if (localStorage.getItem('crewMembers') != null) {
			this.data = JSON.parse(atob(localStorage.getItem('crewMembers')!));
		} else {
			this.data = [];
		}
	}


	insertDataIntoTable() {

		// for (let i = 0; i < this.table.rows.length - 1; i++) {
		// 	if (i != 0) {
		// 		this.table.rows[i].remove();
		// 	}

		// }

		for (let i: number = 1; i < this.table.rows.length; i++) {
			try {
				this.table.deleteRow(i);
			} catch (e) {
				console.warn(e);
			}
		}

		this.data.forEach((val: CrewMember) => {
			let row = this.table.insertRow();

			row.innerHTML = `
			<tr>
				<td>${val.gender}</td>
				<td>${val.ageGroup} ${val.novice ? "Novice" : ""}</td>
				<td class="big">${val.name}</td>
				<td>Actions</td>
			</tr>
			`
		});
	}
}

export { MemberEditor }