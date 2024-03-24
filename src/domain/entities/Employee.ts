export default class Employee {
	readonly id?: number;
	readonly name: string;
	readonly email: string;
	readonly matriculation: string;
	readonly password: string;

	constructor(id: number | undefined, name: string, email: string, matriculation: string, password: string) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.matriculation = matriculation;
		this.password = password;
	}
}