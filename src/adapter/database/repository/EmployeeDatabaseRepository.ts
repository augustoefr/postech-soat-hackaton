import { AppDataSource } from "../data-source";
import IEmployeeRepository from "@ports/IEmployeeRepository";
import Employee from "@entities/Employee";
import EmployeeModel from "../models/EmployeeModel";

export default class EmployeeDatabaseRepository implements IEmployeeRepository {

	employeeRepository = AppDataSource.getRepository(EmployeeModel);

	async save(employee: Employee): Promise<Employee> {
		const newEmployee = this.employeeRepository.create(EmployeeDatabaseRepository.mapDataEntityToModel(employee));
		const created = await this.employeeRepository.save(newEmployee);

		return EmployeeDatabaseRepository.mapDataModelToEntity(created);
	}

	async findById(id: number): Promise<Employee | null> {
		const result = await this.employeeRepository.findOneBy({ id });

		if (result) {
			return EmployeeDatabaseRepository.mapDataModelToEntity(result);
		}

		return null;
	}

	async findByLogin(login: string): Promise<Employee | null> {
		if (!login) return null;

		const isMatriculation = this.checkIsMatriculation(login);
		const result = await this.employeeRepository.findOneBy(isMatriculation ? { matriculation: login } : { name: login });

		if (result) {
			return EmployeeDatabaseRepository.mapDataModelToEntity(result);
		}

		return null;
	}

	async findByEmail(email: string): Promise<Employee | null> {
		const result = await this.employeeRepository.findOneBy({ email });

		if (result) {
			return EmployeeDatabaseRepository.mapDataModelToEntity(result);
		}

		return null;
	}

	async list(): Promise<Employee[] | null> {
		const employees = await this.employeeRepository.find();

		if (employees) {
			return employees.map((model: EmployeeModel) => {
				return EmployeeDatabaseRepository.mapDataModelToEntity(model);
			});
		}

		return null;
	}

	static mapDataModelToEntity(model: EmployeeModel): Employee {
		return new Employee(
			model.id,
			model.name,
			model.email,
			model.matriculation,
			model.password
		);
	}

	static mapDataEntityToModel(entity: Employee): EmployeeModel {
		return new EmployeeModel(
			entity.id,
			entity.name,
			entity.email,
			entity.matriculation,
			entity.password
		);
	}

	checkIsMatriculation(input: string): boolean {
		let regex = /RM[0-9]+/i;
		return regex.test(input);
	}
}