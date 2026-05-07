import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { StatementInvoice } from './statement-invoice.entity';

@Entity('statements')
@Index(['customerId', 'createdAt'])
export class Statement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer', nullable: true, unique: true })
  statementNo?: number;

  @Column({ type: 'integer' })
  customerId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Customer, (customer) => customer.Statements)
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @OneToMany(() => StatementInvoice, (item) => item.statement)
  items!: StatementInvoice[];
}
