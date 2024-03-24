import Employee from "@entities/Employee";
import IEmployeeRepository from "@ports/IEmployeeRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";

export default class FindByLoginUseCase extends AbstractUseCase {

	constructor(readonly employeeRepository: IEmployeeRepository) {
		super();
	}

	async execute(login: string): Promise<Employee | null> {
		const employee = await this.employeeRepository.findByLogin(login);

		if (!employee) {
			this.setError({ message: 'Employee not found!' });
			return null;
		}

		return employee;
	}
}