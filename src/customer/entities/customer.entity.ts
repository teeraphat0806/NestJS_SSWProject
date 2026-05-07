import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CustomerContact } from './customer-contact.entity';
import { Bill } from '../../bill/entities/bill.entity';
import { OrderPO } from '../../order-po/entities/order-po.entity';
import { Statement } from '../../statement/entities/statement.entity';
import { Quotation } from '../../quotation/entities/quotation.entity';
import { Acquittance } from '../../acquittance/entities/acquittance.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'integer', default: 30 })
  credit!: number;

  @Column({ type: 'varchar' })
  address!: string;

  @Column({ type: 'varchar', nullable: true })
  tel?: string;

  @Column({ type: 'varchar', nullable: true })
  taxNumber?: string;

  @Column({ type: 'varchar', nullable: true })
  faxNumber?: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'varchar', nullable: true })
  faxNumberSearch?: string;

  @Column({ type: 'varchar', nullable: true })
  telSearch?: string;

  @OneToMany(() => CustomerContact, (contact) => contact.customer)
  contacts!: CustomerContact[];

  @OneToMany(() => Acquittance, (acquittance) => acquittance.customer)
  Acquittances!: Acquittance[];

  @OneToMany(() => Bill, (bill) => bill.customer)
  Bill!: Bill[];

  @OneToMany(() => OrderPO, (orderPO) => orderPO.customer)
  OrderPO!: OrderPO[];

  @OneToMany(() => Statement, (statement) => statement.customer)
  Statements!: Statement[];

  @OneToMany(() => Quotation, (quotation) => quotation.customer)
  quotation!: Quotation[];
}
