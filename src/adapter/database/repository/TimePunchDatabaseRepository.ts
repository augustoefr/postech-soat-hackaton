import { AppDataSource } from "../data-source";
import ITimePunchRepository from "@ports/ITimePunchRepository";
import TimePunch from "@entities/TimePunch";
import TimePunchModel from "../models/TimePunchModel";
import { Between } from "typeorm";

export default class TimePunchDatabaseRepository implements ITimePunchRepository {
    timePunchRepository = AppDataSource.getRepository(TimePunchModel);

    async save(timePunch: TimePunch): Promise<TimePunch> {
        const newTimePunch = this.timePunchRepository.create(TimePunchDatabaseRepository.mapDataEntityToModel(timePunch));
        const created = await this.timePunchRepository.save(newTimePunch);

        return TimePunchDatabaseRepository.mapDataModelToEntity(created);
    }

    async listByDay(employeeId: string, day: Date): Promise<TimePunch[] | null> {
        const { start, end } = TimePunchDatabaseRepository
            .getStartEndByDatePart(day.getFullYear(), day.getMonth(), day.getDate());

        return this.listByPeriod(employeeId, start, end);
    }

    async listByMonth(employeeId: string, month: Date): Promise<TimePunch[] | null> {
        const { start, end } = TimePunchDatabaseRepository
            .getStartEndByDatePart(month.getFullYear(), month.getMonth());

        return this.listByPeriod(employeeId, start, end);
    }

    async listByPeriod(employeeId: string, start: Date, end: Date): Promise<TimePunch[] | null> {
        const timePunches = await this.timePunchRepository.find({
            where: {
                employee: { matriculation: employeeId },
                time: Between(start, end)
            }
        });

        if (timePunches) {
            return timePunches.map((model: TimePunchModel) => {
                return TimePunchDatabaseRepository.mapDataModelToEntity(model);
            });
        }

        return null;
    }

    static getStartEndByDatePart(year: number, month: number, day?: number) {
        const endMonth = day ? month : month + 1;
        const start = new Date(year, month, day || 1);
        const end = new Date(year, endMonth, day || 0, 23, 59, 59, 999);
        return { start, end };
    }

    static mapDataModelToEntity(model: TimePunchModel): TimePunch {
        return new TimePunch(
            model.id,
            model.time,
            model.employee
        );
    }

    static mapDataEntityToModel(entity: TimePunch): TimePunchModel {
        return new TimePunchModel(
            entity.id,
            entity.time as Date,
            entity.employee
        );
    }
}