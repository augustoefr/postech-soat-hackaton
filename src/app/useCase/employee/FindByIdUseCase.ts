import Employee from "@entities/Employee";
import IEmployeeRepository from "@ports/IEmployeeRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";

export default class FindByIdUseCase extends AbstractUseCase {

	constructor(readonly employeeRepository: IEmployeeRepository) {
		super();
	}

	async execute(id: string): Promise<Employee | null> {
		const employee = await this.employeeRepository.findById(id);

		if (!employee) {
			this.setError({ message: 'Employee not found!' });
            return null;
		}

		return employee;
	}
}