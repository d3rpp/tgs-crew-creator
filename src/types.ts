type Gender = "M" | "F";

type AgeGroup = "U15" | "U16" | "U17" | "U18";

class CrewMember {
	id!: number;
	name!: string;
	gender!: Gender;
	ageGroup!: AgeGroup;
	novice!: boolean;

	public constructor(i: CrewMemberInterface);
	public constructor(id: number, name: string, gender: Gender, ageGroup: AgeGroup, novice: boolean);
	public constructor(...args: any[]) {
		if (args.length == 1) {
			this.fromInterface(args[0]);
		}
		else if (args.length == 5) {
			this.fromValues(args[0], args[1], args[2], args[3], args[4]);
		} else {
			throw new Error("Crew Member incorrectly initialised");
		}
	}

	private fromInterface(i: CrewMemberInterface) {
		this.id = i.id!;
		this.name = i.name;
		this.gender = i.gender;
		this.novice = i.novice;
		this.ageGroup = i.ageGroup;
	}

	private fromValues(id: number, name: string, gender: Gender, ageGroup: AgeGroup, novice: boolean) {
		this.id = id;
		this.name = name;
		this.gender = gender;
		this.novice = novice;
		this.ageGroup = ageGroup;
	}

}

interface CrewMemberInterface {
	id?: number;
	name: string;
	gender: Gender;
	ageGroup: AgeGroup;
	novice: boolean;
}

export { CrewMember, CrewMemberInterface, Gender, AgeGroup }