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
			model.name
		);
	}

	static mapDataEntityToModel(entity: Employee): EmployeeModel {
		return new EmployeeModel(
			entity.id,
			entity.name
		);
	}
}