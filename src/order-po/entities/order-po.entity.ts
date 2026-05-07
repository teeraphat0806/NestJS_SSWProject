import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { JobStatus } from '../../common/enums';
import { Customer } from '../../customer/entities/customer.entity';
import { Bill } from '../../bill/entities/bill.entity';
import { Quotation } from '../../quotation/entities/quotation.entity';
import { Invoice } from './invoice.entity';
import { OrderPOStaff } from './order-po-staff.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('order_pos')
@Index(['status'])
@Index(['createdAt'])
@Index(['customerId', 'status'])
@Index(['billId'])
@Index(['customerId'])
export class OrderPO {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: true })
  poNumber?: string;

  @Column({ type: 'integer', nullable: true })
  customerId?: number;

  @Column({ type: 'integer', nullable: true, unique: true })
  billId?: number;

  @Column({ type: 'integer', nullable: true, unique: true })
  quotationId?: number;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.PENDING,
  })
  status!: JobStatus;

  @Column({ type: 'float' })
  total!: number;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @Column({ type: 'simple-array' })
  urlPo?: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'integer', unique: true, default: 0 })
  codetoinvoice!: number;

  @ManyToOne(() => Customer, (customer) => customer.OrderPO)
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @ManyToOne(() => Bill, (bill) => bill.OrderPO)
  @JoinColumn({ name: 'billId' })
  bill!: Bill;

  @OneToOne(() => Quotation, (quotation) => quotation.OrderPO)
  @JoinColumn({ name: 'quotationId' })
  quotation!: Quotation;

  @OneToOne(() => Invoice, (invoice) => invoice.orderPO)
  invoice!: Invoice;

  @OneToMany(() => OrderPOStaff, (staffLink) => staffLink.orderPO)
  staffLinks!: OrderPOStaff[];

  @OneToMany(() => Product, (product) => product.orderPO)
  products!: Product[];
}
