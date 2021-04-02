class CrewEditor {
	mainPoint: HTMLElement;

	constructor(querySelector: string) {
		try {
			this.mainPoint = document.querySelector(querySelector)!;
			console.log("Crew Editor: Initialised Successfully")
		} catch (e) {
			throw new Error("Crew Editor: Unable to find master element for page");
		}
	}
}

export { CrewEditor }