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

@Entity('bills')
@Index(['customerId'])
@Index(['salesNameId'])
@Index(['deliveredById'])
export class Bill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  customerId!: number;

  @Column({ type: 'varchar', unique: true })
  codeCustomer!: string;

  @Column({ type: 'timestamp' })
  deliveryDate!: Date;

  @Column({ type: 'varchar' })
  salesName!: string;

  @Column({ type: 'varchar', nullable: true })
  deliveredBy!: string;

  @Column({ type: 'varchar', nullable: true })
  description!: string;

  @Column({ type: 'float', default: 7.0 })
  vatRate!: number;

  @Column({ type: 'float', nullable: true })
  subtotal!: number;

  @Column({ type: 'float', nullable: true })
  grandTotal!: number;

  @Column({ type: 'float', nullable: true })
  discount!: number;

  @Column({ type: 'float' })
  vat!: number;

  @Column({ type: 'timestamp', nullable: true })
  dateReceive?: Date;

  @Column({ type: 'integer' })
  salesNameId!: number;

  @Column({ type: 'integer', nullable: true })
  deliveredById?: number;

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: 'integer', default: 30 })
  credit!: number;

  @ManyToOne(() => Customer, (customer) => customer.Bill)
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @ManyToOne(() => Staff, (staff) => staff.Bill_Bill_deliveredByToStaff)
  @JoinColumn({ name: 'deliveredById' })
  Staff_Bill_deliveredByToStaff!: Staff;

  @ManyToOne(() => Staff, (staff) => staff.Bill_Bill_salesNameToStaff)
  @JoinColumn({ name: 'salesNameId' })
  Staff_Bill_salesNameToStaff!: Staff;

  @OneToOne(() => OrderPO, (orderPO) => orderPO.bill)
  OrderPO!: OrderPO;
}
