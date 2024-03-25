import CreateUseCase from "@useCases/timePunch/CreateUseCase";
import ListByPeriodUseCase from "@useCases/timePunch/ListByPeriodUseCase";
import TimePunch from "@entities/TimePunch";
import ITimePunchRepository from "@ports/ITimePunchRepository";
import IError from "src/domain/error/IError";
import IEmployeeRepository from "@ports/IEmployeeRepository";
import TimePunchReport from "@entities/TimePunchReport";
import Employee from "@entities/Employee";
import IEmailApi from "@ports/email/IEmailApi";
import SendReportUseCase from "@useCases/timePunch/SendReportUseCase";
import path from "path";

const reportEmailTemplate = path.resolve(__dirname, '..') + '/adapter/email/templates/TimePunchReport.ejs'

export default class TimePunchController {

	constructor(readonly timePunchRepository: ITimePunchRepository, readonly employeeRepository: IEmployeeRepository, readonly emailSender: IEmailApi) {}

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

	
	async sendTimePunchReport(employee: Employee, year: number, month: number): Promise<any>{
		
		const reportUseCase = new SendReportUseCase(this.timePunchRepository, this.employeeRepository, this.emailSender, reportEmailTemplate);
		const report = reportUseCase.execute(employee, year, month);

		if(reportUseCase.hasErrors()){
			Promise.reject(reportUseCase.getErrors());
		}

		return report;
	}
}