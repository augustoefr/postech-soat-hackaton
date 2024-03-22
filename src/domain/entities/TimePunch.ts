import Employee from "./Employee";

export default class TimePunch {
	readonly id?: number;
	readonly time?: Date;
	readonly employee: Employee;

	constructor(id: number | undefined, time: Date | undefined, employee: Employee) {
		this.id = id;
        this.time = time || new Date();
        this.employee = employee;
	}
}