import { Request, Response } from "express";
import EmployeeController from "@controllers/EmployeeController";
import EmployeeDatabaseRepository from "@database/repository/EmployeeDatabaseRepository";
import Employee from "@entities/Employee";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const employeeRepository = new EmployeeDatabaseRepository();
const employeeController = new EmployeeController(employeeRepository);

const jwtSecret = process.env.JWT_SECRET as string;

export default class AuthApiController {

    static async login(req: Request, res: Response) {
        const { login, password } = req.body;
        try {
            let employee = await employeeController.getByLogin(login);
            if (employee) {
                employee = employee as Employee;
                if (await bcrypt.compare(password, employee.password)) {
                    const token = jsonwebtoken.sign(
                        { user: JSON.stringify(employee) },
                        jwtSecret,
                        { expiresIn: "60m" }
                    )

                    return res.status(200).json({ token: token });
                } else {
                    return res.status(400).json({ message: "Incorrect login or password" });
                }
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    static async register(req: Request, res: Response) {
        let employee: Employee = req.body;
        try {
            const registeredEmployee = await employeeController.register(employee);

            /* #swagger.responses[201] = {
            schema: { $ref: "#/definitions/TimePunch" },
            description: 'Colaborador registrado'
            } */
            return res.status(201).json(registeredEmployee);

        } catch (error) {
            return res.status(400).json(error);
        }
    }
}