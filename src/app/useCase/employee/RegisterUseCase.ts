import Employee from "@entities/Employee";
import IEmployeeRepository from "@ports/IEmployeeRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";
import schema from "../../validation/createEmployee";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
export default class RegisterUseCase extends AbstractUseCase {
        constructor(readonly employeeRepository: IEmployeeRepository) {
                super();
        }

        public async execute(employee: Employee): Promise<Employee | null> {
                this.validateFields(employee);

                if (this.hasErrors()) {
                        return null;
                }

                const hashedPassword = await bcrypt.hash(employee.password, 12)
                employee = { ...employee, password: hashedPassword };

                return await this.employeeRepository.save(employee);
        }

        private validateFields(employee: Employee) {
                this.validateSchema(schema, employee);
        }
}