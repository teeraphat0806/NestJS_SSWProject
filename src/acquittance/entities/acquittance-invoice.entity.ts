import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Acquittance } from './acquittance.entity';
import { Invoice } from '../../order-po/entities/invoice.entity';

@Entity('acquittance_invoices')
@Index(['acquittanceId'])
@Index(['invoiceId'])
export class AcquittanceInvoice {
  @PrimaryColumn({ type: 'integer' })
  acquittanceId!: number;

  @PrimaryColumn({ type: 'integer', unique: true })
  invoiceId!: number;

  @ManyToOne(() => Acquittance, (acquittance) => acquittance.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'acquittanceId' })
  acquittance!: Acquittance;

  @ManyToOne(() => Invoice, (invoice) => invoice.acquittanceItem)
  @JoinColumn({ name: 'invoiceId' })
  invoice!: Invoice;
}
