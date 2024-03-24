export default class Employee {
	readonly id?: string;
	readonly name: string;
	readonly email: string;

	constructor(id: string | undefined, name: string, email: string) {
		this.id = id;
        this.name = name;
		this.email = email;
	}
}