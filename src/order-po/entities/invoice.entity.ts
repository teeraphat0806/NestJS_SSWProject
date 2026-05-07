import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { OrderPO } from './order-po.entity';
import { AcquittanceInvoice } from '../../acquittance/entities/acquittance-invoice.entity';
import { StatementInvoice } from '../../statement/entities/statement-invoice.entity';

@Entity('invoices')
@Index(['codetoinvoice'])
@Index(['invoiceNo'])
export class Invoice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer', unique: true })
  codetoinvoice!: number;

  @Column({ type: 'integer', unique: true })
  invoiceNo!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne(() => OrderPO, (orderPO) => orderPO.invoice)
  @JoinColumn({ name: 'codetoinvoice', referencedColumnName: 'codetoinvoice' })
  orderPO!: OrderPO;

  @OneToMany(() => AcquittanceInvoice, (item) => item.invoice)
  acquittanceItem!: AcquittanceInvoice[];

  @OneToMany(() => StatementInvoice, (item) => item.invoice)
  statementItem!: StatementInvoice[];
}
