import Employee from "@entities/Employee";

const fetch = require("node-fetch");

declare type EmployeeAuthInfo = {
	id: number,
	name: string
}

export default class AuthLambdaIntegration {
	static mapCustomerToAuthInfo(employee: Employee): EmployeeAuthInfo {
		return { id: employee.id, name: employee.name } as EmployeeAuthInfo;
	}

	async putEmployee(employee: Employee): Promise<any> {
		try {
			const employeeInfo = AuthLambdaIntegration.mapCustomerToAuthInfo(employee);
			const url = process.env.AUTH_PUT_CLIENT;

			const response = await fetch(url, { method: 'POST', body: JSON.stringify(employeeInfo) });

			if (!response.ok) {
				console.log(`Erro ao enviar dados do colaborador: ${response.statusText}`);
				return null;
			}

			return await response.json();

		} catch (error) {
			console.log(`Erro ao enviar dados do colaborador`, error);
			return null;
		}
	}
}