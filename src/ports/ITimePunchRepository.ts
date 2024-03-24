import TimePunch from "@entities/TimePunch";

export default interface ITimePunchRepository {
	save(timePunch: TimePunch): Promise<TimePunch>;
	listByDay(employee: string, day: Date): Promise<TimePunch[] | null>;
	listByMonth(employee: string, month: Date): Promise<TimePunch[] | null>;
	listByPeriod(employee: string, start: Date, end: Date): Promise<TimePunch[] | null>;
}