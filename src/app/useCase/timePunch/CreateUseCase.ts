import Employee from "@entities/Employee";
import TimePunch from "@entities/TimePunch";
import IEmployeeRepository from "@ports/IEmployeeRepository";
import ITimePunchRepository from "@ports/ITimePunchRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";
import FindByIdUseCase from "@useCases/employee/FindByIdUseCase";

export default class CreateUseCase extends AbstractUseCase {
	constructor(readonly timePunchRepository: ITimePunchRepository, readonly employeeRepository: IEmployeeRepository) {
        super();
	}

	public async execute(employeeId: number): Promise<TimePunch | null> {
        const employee = await this.getEmployee(employeeId)
		
		if (this.hasErrors()) {
			return null;
		}

        const customer: TimePunch = {employee: employee as Employee};

		return await this.timePunchRepository.save(customer);
	}

    private async getEmployee(employeeId: number):Promise<Employee | null>{
        const findByIdUseCase = new FindByIdUseCase(this.employeeRepository);
        const employee = await findByIdUseCase.execute(employeeId);

        if (!employee) {
            this.setError({ message: 'Employee not found' });
            return null;
        }

        return employee;
    }
}