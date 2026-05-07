import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';
import { ExpenseCategory } from './expense-category.entity';

@Entity('expenses')
@Index(['staffId'])
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  description!: string;

  @Column({ type: 'float' })
  amount!: number;

  @Column({ type: 'timestamp' })
  expenseDate!: Date;

  @Column({ type: 'integer' })
  categoryId!: number;

  @Column({ type: 'varchar', nullable: true })
  receiptUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'integer', nullable: true })
  staffId?: number;

  @ManyToOne(() => Staff, (staff) => staff.expenses, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'staffId' })
  staff!: Staff;

  @ManyToOne(() => ExpenseCategory, (category) => category.expenses)
  @JoinColumn({ name: 'categoryId' })
  category!: ExpenseCategory;
}
