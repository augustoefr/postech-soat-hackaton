import Employee from "./Employee";
import TimePunch from "./TimePunch";
import Workday from "./Workday";

export default class TimePunchReport {
    public workdays: Workday[];
    public maxPunchesLength: number;
    public totalWorkingHours: number;
    public formattedWorkingHours: string;
    // private punches: { [day: string]: TimePunch[] } = {};

    constructor(public employee: Employee, timePunches: TimePunch[]) {
        this.workdays = [];
        this.maxPunchesLength = 0;
        this.totalWorkingHours = 0;
        this.formattedWorkingHours = '';

        const punchesByDay: { [day: string]: TimePunch[] } = {};
        
        timePunches.sort((a, b) => (a.time?.getTime() || 0) - (b.time?.getTime() || 0)).forEach(punch => {
            const day = this.getDayKey(punch.time as Date);
            if (!punchesByDay[day]) {
                punchesByDay[day] = [];
            }
            punchesByDay[day].push(punch);
        });

        Object.values(punchesByDay).forEach( (dayPunches) => {
            if(dayPunches.length > this.maxPunchesLength) this.maxPunchesLength = dayPunches.length;
            const workday = new Workday(dayPunches);
            this.workdays.push(workday);
            this.totalWorkingHours += workday.workingHours;
        });

        const hours = Math.floor( this.totalWorkingHours );
        const minutes = Math.round( (this.totalWorkingHours - hours) * 60 );
        this.formattedWorkingHours = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    private getDayKey(date: Date): string {
        return new Date(date.valueOf() - (date.getTimezoneOffset() * 1000 * 60)).toJSON().split('T')[0];
    }
}