import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ContactType } from '../../common/enums';
import { Customer } from './customer.entity';

@Entity('customer_contacts')
export class CustomerContact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  customerId!: number;

  @Column({
    type: 'enum',
    enum: ContactType,
  })
  type!: ContactType;

  @Column({ type: 'varchar' })
  value!: string;

  @Column({ type: 'boolean', default: false })
  isPrimary!: boolean;

  @Column({ type: 'varchar', nullable: true })
  label?: string;

  @ManyToOne(() => Customer, (customer) => customer.contacts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;
}
