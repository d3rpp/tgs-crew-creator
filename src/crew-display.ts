class CrewDisplay {
	mainPoint: HTMLElement;

	constructor(querySelector: string) {
		try {
			this.mainPoint = document.querySelector(querySelector)!;
			console.log("Crew Display: Initialised Successfuly");
		} catch (e) {
			throw new Error("Crew Display: Unable to find master element for page");
		}
	}

}

export { CrewDisplay }