import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Staff } from './staff.entity';

@Entity('staff_employment')
@Index('idx_staff_start_date', ['staffId', 'startDate'])
@Index('idx_staff_end_date', ['staffId', 'endDate'])
@Unique(['staffId', 'endDate'])
export class StaffEmployment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  staffId!: number;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Staff, (staff) => staff.employments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staffId' })
  staff!: Staff;
}
