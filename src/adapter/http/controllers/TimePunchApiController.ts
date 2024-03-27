import { Request, Response } from "express";
import TimePunchDatabaseRepository from "@database/repository/TimePunchDatabaseRepository";
import TimePunchController from "@controllers/TimePunchController";
import IAuthenticatedRequest from "@ports/auth/IAuthenticatedRequest";
import EmployeeDatabaseRepository from "@database/repository/EmployeeDatabaseRepository";
import Employee from "@entities/Employee";
import NodeMailerEmailIntegration from "src/adapter/email/NodeMailerEmailIntegration";

const timePunchRepository = new TimePunchDatabaseRepository();
const employeeRepository = new EmployeeDatabaseRepository();
const mailSender = new NodeMailerEmailIntegration();
const controller = new TimePunchController(timePunchRepository, employeeRepository, mailSender);

export default class TimePunchApiController {

	async create(req: Request, res: Response) {
		// #swagger.tags = ['TimePunch']
		// #swagger.description = 'Endpoint para um empregado bater o ponto.'

		const employee = JSON.parse((req as IAuthenticatedRequest).userInfo.user) as Employee;

		try {
			const created = await controller.create(employee.matriculation);

			/* #swagger.responses[201] = {
				schema: { $ref: "#/definitions/TimePunch" },
				description: 'Batida de ponto registrada'
			} */
			return res.status(201).json(created);
		} catch (error) {
			return res.status(400).json(error);
		}
	}

	async getTimePunchesByPeriod(req: Request, res: Response) {
		// #swagger.tags = ['TimePunch']
		// #swagger.description = 'Endpoint para obter um cliente pelo CPF.'
		/* #swagger.parameters['year'] = { in: 'path', description: 'Ano das batidas de ponto desejadas' } */
		/* #swagger.parameters['month'] = { in: 'path', description: 'Mês das batidas de ponto desejadas' } */
		/* #swagger.parameters['day'] = { in: 'path', description: 'Dia das batidas de ponto desejadas' } */
		const { year, month, day } = req.params;
		const employee = JSON.parse((req as IAuthenticatedRequest).userInfo.user) as Employee;

		try {
			const timePunches = await controller
				.getTimePunchesByPeriod(employee.matriculation, parseInt(year), parseInt(month), parseInt(day));

			/* #swagger.responses[200] = {
				schema: { $ref: "#/definitions/TimePunches" },
				description: 'Batidas de ponto encontradas'
			} */
			return res.status(200).json(timePunches);
		} catch (error) {
			return res.status(400).json(error);
		}
	}


	async sendTimePunchReport(req: Request, res: Response) {
		const { year, month } = req.params;
		const employee = JSON.parse((req as IAuthenticatedRequest).userInfo.user) as Employee;

		try {
			const report = await controller.sendTimePunchReport(employee, Number(year), Number(month));

			/* #swagger.responses[200] = {
				schema: { $ref: "#/definitions/TimePunches" },
				description: 'Relatório de espelho de ponto enviado'
			} */
			return res.status(200).json(report);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}