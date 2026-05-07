import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Staff } from './staff.entity';
import { TypeStaffIncome } from './type-staff-income.entity';

@Entity('staff_income')
@Index(['staffId'])
@Index(['typeId'])
export class StaffIncome {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'float' })
  amount!: number;

  @Column({ type: 'varchar' })
  nameIncome!: string;

  @Column({ type: 'varchar', default: '-' })
  detail!: string;

  @Column({ type: 'integer' })
  staffId!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @Column({ type: 'integer', nullable: true })
  typeId?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Staff, (staff) => staff.StaffIncome)
  @JoinColumn({ name: 'staffId' })
  staff!: Staff;

  @ManyToOne(() => TypeStaffIncome, (type) => type.incomes)
  @JoinColumn({ name: 'typeId' })
  type!: TypeStaffIncome;
}
