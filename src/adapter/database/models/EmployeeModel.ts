import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import TimePunchModel from './TimePunchModel';

@Entity('employees')
export default class EmployeeModel {
	@PrimaryColumn()
	id?: string;

	@Column({ type: 'text', nullable: false })
	name: string;

	@Column({type: 'text', nullable: false})
	email: string;

    @OneToMany(() => TimePunchModel, timePunch => timePunch.employee)
	timePunchs?: TimePunchModel[];

	constructor(id: string | undefined, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}
}