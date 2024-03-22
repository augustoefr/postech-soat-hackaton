import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import EmployeeModel from './EmployeeModel';

@Entity('timePunchs')
export default class TimePunchModel {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ type: 'timestamp', nullable: false })
	time: Date;

	@ManyToOne(() => EmployeeModel, employee => employee.timePunchs)
    @JoinColumn({ name: 'employeeId' })
    employee: EmployeeModel;

	constructor(id: number | undefined, time: Date, employee: EmployeeModel) {
		this.id = id;
		this.time = time;
        this.employee = employee;
    }
}