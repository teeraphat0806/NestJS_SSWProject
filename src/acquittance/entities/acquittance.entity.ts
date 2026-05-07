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
import { AcquittanceInvoice } from './acquittance-invoice.entity';

@Entity('acquittances')
@Index(['customerId', 'createdAt'])
export class Acquittance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer', nullable: true, unique: true })
  acquittanceNo?: number;

  @Column({ type: 'integer' })
  customerId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Customer, (customer) => customer.Acquittances)
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @OneToMany(() => AcquittanceInvoice, (item) => item.acquittance)
  items!: AcquittanceInvoice[];
}
