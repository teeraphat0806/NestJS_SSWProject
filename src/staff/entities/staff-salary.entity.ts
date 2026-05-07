import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Staff } from './staff.entity';

@Entity('staff_salary')
@Unique(['staffId', 'effectiveDate'])
@Index('idx_staff_salary_date', ['staffId', 'effectiveDate'])
export class StaffSalary {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  staffId!: number;

  @Column({ type: 'float' })
  amount!: number;

  @Column({ type: 'timestamp' })
  effectiveDate!: Date;

  @Column({ type: 'varchar', nullable: true })
  detail?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Staff, (staff) => staff.StaffSalary)
  @JoinColumn({ name: 'staffId' })
  staff!: Staff;
}
