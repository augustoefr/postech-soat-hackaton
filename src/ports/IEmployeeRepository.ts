import Employee from "@entities/Employee";

export default interface IEmployeeRepository {
	save(employee: Employee): Promise<Employee>;
	findById(id: string): Promise<Employee | null>;
    list(): Promise<Employee[] | null>
}