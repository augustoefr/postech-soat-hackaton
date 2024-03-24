import CreateUseCase from "@useCases/timePunch/CreateUseCase";
import ListByPeriodUseCase from "@useCases/timePunch/ListByPeriodUseCase";
import TimePunch from "@entities/TimePunch";
import ITimePunchRepository from "@ports/ITimePunchRepository";
import IError from "src/domain/error/IError";
import IEmployeeRepository from "@ports/IEmployeeRepository";

export default class TimePunchController {

	constructor(readonly timePunchRepository: ITimePunchRepository, readonly employeeRepository: IEmployeeRepository) { }

	async create(login: string): Promise<TimePunch | null | IError[]> {
		const createUseCase = new CreateUseCase(this.timePunchRepository, this.employeeRepository);
		const created = await createUseCase.execute(login);

		if (createUseCase.hasErrors()) {
			throw createUseCase.getErrors();
		}

		return created;
	}

	async getTimePunchesByPeriod(employeeId: string, year: number, month: number, day: number): Promise<TimePunch[] | null> {
		const listUseCase = new ListByPeriodUseCase(this.timePunchRepository);
		const timePunches = await listUseCase.execute(employeeId, year, month, day);

		if (listUseCase.hasErrors()) {
			return Promise.reject(listUseCase.getErrors());
		}

		return Promise.resolve(timePunches);
	}
}