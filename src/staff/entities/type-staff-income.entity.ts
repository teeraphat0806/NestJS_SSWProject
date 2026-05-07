import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StaffIncome } from './staff-income.entity';

@Entity('type_staff_income')
export class TypeStaffIncome {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'float' })
  amount!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  types!: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  onDelete!: boolean;

  @OneToMany(() => StaffIncome, (income) => income.type)
  incomes!: StaffIncome[];
}
