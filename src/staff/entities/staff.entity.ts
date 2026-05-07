import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { JobPosition } from './job-position.entity';
import { StaffEmployment } from './staff-employment.entity';
import { StaffSalary } from './staff-salary.entity';
import { StaffIncome } from './staff-income.entity';
import { Bill } from '../../bill/entities/bill.entity';
import { OrderPOStaff } from '../../order-po/entities/order-po-staff.entity';
import { Expense } from '../../expense/entities/expense.entity';
import { Quotation } from '../../quotation/entities/quotation.entity';

@Entity('staff')
@Index(['positionId'])
export class Staff {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer', unique: true, nullable: true })
  userId?: number;

  @Column({ type: 'varchar', unique: true, nullable: true })
  bankAccount?: string;

  @Column({ type: 'varchar', nullable: true })
  bankName?: string;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'varchar', unique: true })
  code!: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  social_security?: string;

  @Column({ type: 'float' })
  currentSalary!: number;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'varchar', nullable: true, unique: true })
  taxid!: string;

  @Column({ type: 'integer', nullable: true })
  positionId!: number;

  @Column({ type: 'boolean', default: true })
  hireStatus!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  TerminationDate!: Date;

  @OneToOne(() => User, (user) => user.staff, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => JobPosition, (position) => position.staff)
  @JoinColumn({ name: 'positionId' })
  jobPosition!: JobPosition;

  @OneToMany(() => StaffEmployment, (employment) => employment.staff)
  employments!: StaffEmployment[];

  @OneToMany(() => StaffSalary, (salary) => salary.staff)
  StaffSalary!: StaffSalary[];

  @OneToMany(() => StaffIncome, (income) => income.staff)
  StaffIncome!: StaffIncome[];

  @OneToMany(() => Bill, (bill) => bill.Staff_Bill_deliveredByToStaff)
  Bill_Bill_deliveredByToStaff!: Bill[];

  @OneToMany(() => Bill, (bill) => bill.Staff_Bill_salesNameToStaff)
  Bill_Bill_salesNameToStaff!: Bill[];

  @OneToMany(() => OrderPOStaff, (orderStaff) => orderStaff.staff)
  orderLinks!: OrderPOStaff[];

  @OneToMany(() => Expense, (expense) => expense.staff)
  expenses!: Expense[];

  @OneToMany(() => Quotation, (quotation) => quotation.staff)
  quotation!: Quotation[];
}
