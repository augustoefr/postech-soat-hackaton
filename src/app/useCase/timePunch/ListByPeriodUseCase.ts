import TimePunch from "@entities/TimePunch";
import ITimePunchRepository from "@ports/ITimePunchRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";
import IError from "src/domain/error/IError";

export default class ListByPeriodUseCase extends AbstractUseCase {

	constructor(readonly timePunchRepository: ITimePunchRepository) {
		super();
	}

	async execute(employeeId: number, year: number, month: number, day: number|undefined): Promise<TimePunch[] | null> {
		this.validateFields(employeeId, year, month, day);

		if (this.hasErrors()) {
			return null;
		}

        const date = this.getDate(year, month, day);

        if(day){
            return await this.timePunchRepository.listByDay(employeeId, date);
        }

        return await this.timePunchRepository.listByMonth(employeeId, date);
	}

    private getDate(y:number, m:number, d:number|undefined){
        return new Date(y, m-1, d || 1);
    }

    private validateFields(employeeId: number, year: number, month: number, day: number|undefined) {
		const errorList: IError[] = [];
        
        if(!employeeId) errorList.push({ type: "ValidationError", message: 'Missing or invalid employee id' });
        if(!year) errorList.push({ type: "ValidationError", message: 'Missing or invalid year' });
        if(!(month >= 1 && month <= 12) ) errorList.push({ type: "ValidationError", message: 'Missing or invalid month' });
        if(this.getDate(year, month, day).toString() === 'Invalid Date') errorList.push({ type: "ValidationError", message: 'Invalid period' });
        
        if(errorList.length) this.setErrors(errorList);
	}
}