import Employee from "@entities/Employee";

export default interface ICustomerRepository {
	save(employee: Employee): Promise<Employee>;
	findById(id: string): Promise<Employee | null>;
    list(): Promise<Employee[] | null>
}