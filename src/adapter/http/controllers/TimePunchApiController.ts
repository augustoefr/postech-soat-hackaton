import { Request, Response } from "express";
import TimePunchDatabaseRepository from "@database/repository/TimePunchDatabaseRepository";
import TimePunchController from "@controllers/TimePunchController";
import IAuthenticatedRequest from "@ports/auth/IAuthenticatedRequest";
import EmployeeDatabaseRepository from "@database/repository/EmployeeDatabaseRepository";

const timePunchRepository = new TimePunchDatabaseRepository();
const employeeRepository = new EmployeeDatabaseRepository();
const controller = new TimePunchController(timePunchRepository, employeeRepository);

export default class TimePunchApiController {

	async create(req: Request, res: Response) {
		// #swagger.tags = ['TimePunch']
		// #swagger.description = 'Endpoint para um empregado bater o ponto.'
		
		const employee = (req as IAuthenticatedRequest).userInfo.id as string;

		const session = req.session as any;
  		session.count = (session.count || 0) + 1;
		const counter = session.count;

		try {
			const created = await controller.create(employee);

			/* #swagger.responses[201] = {
				schema: { $ref: "#/definitions/TimePunch" },
				description: 'Batida de ponto registrada'
			} */
			return res.status(201).json({counter, ...created});
		} catch (error) {
			return res.status(400).json({counter, error});
		}
	}

	async getTimePunchesByPeriod(req: Request, res: Response) {
		// #swagger.tags = ['TimePunch']
		// #swagger.description = 'Endpoint para obter um cliente pelo CPF.'
		/* #swagger.parameters['year'] = { in: 'path', description: 'Ano das batidas de ponto desejadas' } */
		/* #swagger.parameters['month'] = { in: 'path', description: 'Mês das batidas de ponto desejadas' } */
		/* #swagger.parameters['day'] = { in: 'path', description: 'Dia das batidas de ponto desejadas' } */
		const { year, month, day } = req.params;
		const employee = (req as IAuthenticatedRequest).userInfo.id as string;

		try {
			const timePunches = await controller
			.getTimePunchesByPeriod(employee, parseInt(year), parseInt(month), parseInt(day));

			/* #swagger.responses[200] = {
				schema: { $ref: "#/definitions/TimePunches" },
				description: 'Batidas de ponto encontradas'
			} */
			return res.status(200).json(timePunches);
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}