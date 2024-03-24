
import IError from "src/domain/error/IError";
import IEmployeeRepository from "@ports/IEmployeeRepository";
import RegisterUseCase from "@useCases/employee/RegisterUseCase";
import Employee from "@entities/Employee";
import FindByLoginUseCase from "@useCases/employee/FindByLoginUseCase";

export default class TimePunchController {

	constructor(readonly employeeRepository: IEmployeeRepository) { }

	async register(employee: Employee): Promise<Employee | null | IError[]> {
		const registerUseCase = new RegisterUseCase(this.employeeRepository);
		const registeredEmployee = await registerUseCase.execute(employee);

		if (registerUseCase.hasErrors()) {
			throw registerUseCase.getErrors();
		}

		return registeredEmployee;
	}

	async getByLogin(email: string): Promise<Employee | null | IError[]> {
		if (!email) {
			return null;
		}
		const findByLoginUseCase = new FindByLoginUseCase(this.employeeRepository);
		const registeredEmployee = await findByLoginUseCase.execute(email);

		if (findByLoginUseCase.hasErrors()) {
			throw findByLoginUseCase.getErrors();
		}

		return registeredEmployee;
	}
}