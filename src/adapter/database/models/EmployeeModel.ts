import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import TimePunchModel from './TimePunchModel';

@Entity('employees')
export default class EmployeeModel {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ type: 'text', nullable: false })
	name: string;

	@Column({ type: 'text', nullable: false })
	email: string;

	@Column({ type: 'text', nullable: false })
	matriculation: string;

	@Column({ type: 'text', nullable: false })
	password: string;

	@OneToMany(() => TimePunchModel, timePunch => timePunch.employee)
	timePunchs?: TimePunchModel[];

	constructor(id: number | undefined, name: string, email: string, matriculation: string, password: string) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.matriculation = matriculation;
		this.password = password;
	}
}