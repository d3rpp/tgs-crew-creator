import { CrewDisplayItem } from "./components/CrewDisplayItem";
import { CrewEditorSerialised } from "./components/CrewEditorItem";

class CrewDisplay {
	mainPoint: HTMLElement;
	items: CrewDisplayItem[] = [];
	crews: CrewEditorSerialised[];

	constructor(querySelector: string) {
		try {
			this.mainPoint = document.querySelector(querySelector)!;
		} catch (e) {
			throw new Error("Crew Display: Unable to find master element for page");
		}

		window.addEventListener("storage", () => {
			this.loadCrews();
			this.renderCrews();
			console.log("updated", JSON.parse(atob(window.localStorage.getItem("crews"))));
		});

		this.loadCrews();
		this.renderCrews();

		console.info("Crew Display: Initialised Successfuly");
	}

	private loadCrews() {
		if (JSON.parse(atob(window.localStorage.getItem("crews"))) as CrewEditorSerialised[] == [] || JSON.parse(atob(window.localStorage.getItem("crews"))) as CrewEditorSerialised[] == undefined || JSON.parse(atob(window.localStorage.getItem("crews"))) as CrewEditorSerialised[] == null) return;
		this.crews = JSON.parse(atob(window.localStorage.getItem("crews"))) as CrewEditorSerialised[];

	}

	private renderCrews() {

		// console.log("RENDER CREW DISPLAY")

		this.items = [];
		this.mainPoint.innerHTML = `<div class="container"></div>`;
		let container = this.mainPoint.querySelector(".container");

		this.crews.forEach((val: CrewEditorSerialised) => {
			this.items.push(new CrewDisplayItem(val));
		});

		this.items.forEach((val: CrewDisplayItem) => {
			container.appendChild(val.render());
		});
	}

}

export { CrewDisplay }