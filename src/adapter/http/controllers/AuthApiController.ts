import SessionCredentialHandler from "src/adapter/auth/SessionCredentialHandler";
import { Request, Response } from "express";
import GoogleOauthIntegration from "src/adapter/auth/GoogleOauthIntegration";
import EmployeeController from "@controllers/EmployeeController";
import EmployeeDatabaseRepository from "@database/repository/EmployeeDatabaseRepository";

const employeeRepository = new EmployeeDatabaseRepository();
const employeeController = new EmployeeController(employeeRepository);

export default class AuthApiController{

    static async login(req: Request, res:Response){
        const authApi = AuthApiController.getAuthApi(req);
        const url = await authApi.generateAuthUrl();
        console.log({ url});
        res.redirect(url);
    }

    static async register(req: Request, res: Response){
        try {
			const authApi = AuthApiController.getAuthApi(req);
            if(req.query.code) await authApi.setClientCredentials(req.query.code as string);
            const userData = await authApi.getUserData();

			if(userData){
                const registeredEmployee = await employeeController.register(userData);

                /* #swagger.responses[201] = {
				schema: { $ref: "#/definitions/TimePunch" },
				description: 'Colaborador registrado'
    			} */
                return res.status(201).json(registeredEmployee);
            }

		} catch (error) {
			console.log("register error:", {error});
		}
        return res.status(401).json("Authentication failed");
    }

    private static getAuthApi(request:Request){
        const credentialHandler = new SessionCredentialHandler(request.session);
        return new GoogleOauthIntegration(process.env.LOGIN_REDIRECT_URL as string, credentialHandler);
    }
}