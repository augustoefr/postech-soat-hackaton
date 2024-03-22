import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import TimePunchModel from './TimePunchModel';

@Entity('employees')
export default class EmployeeModel {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ type: 'text', nullable: false })
	name: string;

    @OneToMany(() => TimePunchModel, timePunch => timePunch.employee)
	timePunchs?: TimePunchModel[];

	constructor(id: number | undefined, name: string) {
		this.id = id;
		this.name = name;
	}
}