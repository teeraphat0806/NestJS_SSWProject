import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Statement } from './statement.entity';
import { Invoice } from '../../order-po/entities/invoice.entity';

@Entity('statement_invoices')
@Index(['statementId'])
@Index(['invoiceId'])
export class StatementInvoice {
  @PrimaryColumn({ type: 'integer' })
  statementId!: number;

  @PrimaryColumn({ type: 'integer', unique: true })
  invoiceId!: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.statementItem)
  @JoinColumn({ name: 'invoiceId' })
  invoice!: Invoice;

  @ManyToOne(() => Statement, (statement) => statement.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'statementId' })
  statement!: Statement;
}
