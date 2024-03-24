import Employee from "@entities/Employee";

export default interface IEmployeeRepository {
	save(employee: Employee): Promise<Employee>;
	findById(id: number): Promise<Employee | null>;
	findByLogin(login: string): Promise<Employee | null>;
	findByEmail(email: string): Promise<Employee | null>;
	list(): Promise<Employee[] | null>
}