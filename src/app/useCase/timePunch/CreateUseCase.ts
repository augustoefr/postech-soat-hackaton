import Employee from "@entities/Employee";
import TimePunch from "@entities/TimePunch";
import IEmployeeRepository from "@ports/IEmployeeRepository";
import ITimePunchRepository from "@ports/ITimePunchRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";
import FindByLoginUseCase from "@useCases/employee/FindByLoginUseCase";

export default class CreateUseCase extends AbstractUseCase {
    constructor(readonly timePunchRepository: ITimePunchRepository, readonly employeeRepository: IEmployeeRepository) {
        super();
    }

    public async execute(login: string): Promise<TimePunch | null> {
        const employee = await this.getEmployee(login)

        if (this.hasErrors()) {
            return null;
        }

        const customer: TimePunch = { employee: employee as Employee, time: this.getDateWithoutTimezone() };

        return await this.timePunchRepository.save(customer);
    }

    private async getEmployee(login: string): Promise<Employee | null> {
        const findByLoginUseCase = new FindByLoginUseCase(this.employeeRepository);
        const employee = await findByLoginUseCase.execute(login);

        if (!employee) {
            this.setError({ message: 'Employee not found' });
            return null;
        }

        return employee;
    }

    private getDateWithoutTimezone(): Date {
        let date = new Date()
        date.setHours(date.getHours() - 3);
        return date;
    }
}