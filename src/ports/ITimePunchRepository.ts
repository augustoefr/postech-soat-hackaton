import TimePunch from "@entities/TimePunch";

export default interface ICustomerRepository {
	save(timePunch: TimePunch): Promise<TimePunch>;
	listByDay(employee: number, day: Date): Promise<TimePunch[] | null>;
	listByMonth(employee: number, month: Date): Promise<TimePunch[] | null>;
	listByPeriod(employee: number, start: Date, end: Date): Promise<TimePunch[] | null>;
}