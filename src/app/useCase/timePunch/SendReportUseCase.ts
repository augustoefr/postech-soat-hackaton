import Employee from "@entities/Employee";
import TimePunch from "@entities/TimePunch";
import TimePunchReport from "@entities/TimePunchReport";
import IEmployeeRepository from "@ports/IEmployeeRepository";
import ITimePunchRepository from "@ports/ITimePunchRepository";
import IEmailApi from "@ports/email/IEmailApi";
import AbstractUseCase from "@useCases/AbstractUseCase";
import IError from "src/domain/error/IError";
import ejs from "ejs";
import ListByPeriodUseCase from "./ListByPeriodUseCase";

export default class SendReportUseCase extends AbstractUseCase {

	constructor(readonly timePunchRepository: ITimePunchRepository, readonly employeeRepository: IEmployeeRepository, readonly emailSender: IEmailApi, readonly emailTemplate: string) {
		super();
	}

	async execute(employee: Employee, year: number, month: number): Promise<any> {
		const timePunches = await this.getTimePunches(employee, year, month);

		if (this.hasErrors()) {
			return;
		}

		//MOCK
		// function generateTimePunchesForMonth(): TimePunch[] {
		// 	const punches: TimePunch[] = [];
		// 	const startDate = new Date(2024, 2, 1); // March 1, 2024
		// 	const endDate = new Date(2024, 2, 31); // March 31, 2024

		// 	const currentDate = new Date(startDate);
		// 	while (currentDate <= endDate) {
		// 		const randomNumberOfPunches = 4; // Generate random number of punches per day
		// 		const h = [8, 11, 12, 17]
		// 		for (let i = 0; i < randomNumberOfPunches; i++) {
		// 			const randomHour = h[i];
		// 			const randomMinute = Math.floor(Math.random() * 59);
		// 			const randomSecond = Math.floor(Math.random() * 59);
		// 			const punchTime = new Date(currentDate);
		// 			punchTime.setHours(randomHour, randomMinute, randomSecond);
		// 			punches.push({time : punchTime} as TimePunch);
		// 		}
		// 		currentDate.setDate(currentDate.getDate() + 1);
		// 	}

		// 	return punches;
		// }
		// const timePunches = generateTimePunchesForMonth();


		const report = new TimePunchReport(employee, timePunches as TimePunch[]);

		// ejs.renderFile(require('path').resolve(__dirname, '..') + '/adapter/email/templates/TimePunchReport.ejs', report, (err: any, html: string) => {
		ejs.renderFile(this.emailTemplate, report, (err: any, html: string) => {
			if (err) {
				return console.error(err);
			}

			this.emailSender.send(employee.email, 'Espelho de ponto', html)
		});


		return report;

	}

	private async getTimePunches(employee: Employee, year: number, month: number): Promise<TimePunch[] | null> {
		const listUseCase = new ListByPeriodUseCase(this.timePunchRepository);
		const timePunches = await listUseCase.execute(employee.matriculation, year, month, undefined);

		if (listUseCase.hasErrors()) {
			this.setErrors(listUseCase.getErrors());
		}

		return timePunches;
	}

}