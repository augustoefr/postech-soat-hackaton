import TimePunch from "./TimePunch";

export default class Workday{
    readonly day: Date | null;
    public readonly timePunches: TimePunch[];
    public workingHours: number = 0;
    public formattedWorkingHours: string = '';
    public hasInconsistencies: boolean = false;

    constructor(timePunches: TimePunch[]) {
        this.timePunches = timePunches.sort((a, b) => (a.time?.getTime() || 0) - (b.time?.getTime() || 0));
        this.calculateWorkingHours();

        this.day = this.timePunches.length > 0 ? new Date(this.timePunches[0]?.time as Date) : null;
        this.day?.setHours(0);
        this.day?.setMinutes(0);
        this.day?.setSeconds(0);
        this.day?.setMilliseconds(0);
    }

    private calculateWorkingHours(): void {
        if (this.timePunches.length < 2 || this.hasInconsistencies) {
            this.workingHours = 0;
            this.formattedWorkingHours = '00:00';
            return;
        }

        let totalMillisecondsWorked = 0;
        for (let i = 0; i < this.timePunches.length; i += 2) {
            const entryTime = this.timePunches[i]?.time?.getTime();
            const exitTime = this.timePunches[i + 1]?.time?.getTime();
            if (entryTime && exitTime) {
                totalMillisecondsWorked += exitTime - entryTime;
            } else {
                this.hasInconsistencies = true;
            }
        }

        const hours = Math.floor(totalMillisecondsWorked / (1000 * 60 * 60));
        const minutes = Math.floor((totalMillisecondsWorked % (1000 * 60 * 60)) / (1000 * 60));
        
        this.workingHours = hours + (minutes / 60);
        this.formattedWorkingHours = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
}