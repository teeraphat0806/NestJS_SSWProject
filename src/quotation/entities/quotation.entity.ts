import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Staff } from '../../staff/entities/staff.entity';
import { OrderPO } from '../../order-po/entities/order-po.entity';

@Entity('quotations')
@Index(['customerId'])
export class Quotation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  quotationNo!: string;

  @Column({ type: 'integer' })
  customerId!: number;

  @Column({ type: 'varchar', nullable: true })
  customerName?: string;

  @Column({ type: 'integer', default: 30 })
  credit!: number;

  @Column({ type: 'varchar' })
  salesName!: string;

  @Column({ type: 'integer' })
  salesNameId!: number;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'float', default: 7.0 })
  vatRate!: number;

  @Column({ type: 'float', nullable: true })
  vat?: number;

  @Column({ type: 'float', nullable: true })
  subtotal?: number;

  @Column({ type: 'float', nullable: true })
  grandTotal?: number;

  @Column({ type: 'float', nullable: true })
  discount?: number;

  @Column({ type: 'varchar', nullable: true })
  period?: string;

  @Column({ type: 'varchar', nullable: true })
  deliveryDate?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Customer, (customer) => customer.quotation)
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @ManyToOne(() => Staff, (staff) => staff.quotation)
  @JoinColumn({ name: 'salesNameId' })
  staff!: Staff;

  @OneToOne(() => OrderPO, (orderPO) => orderPO.quotation, { nullable: true })
  OrderPO!: OrderPO;
}
