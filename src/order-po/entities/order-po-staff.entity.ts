import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { OrderStaffRole } from '../../common/enums';
import { OrderPO } from './order-po.entity';
import { Staff } from '../../staff/entities/staff.entity';

@Entity('order_po_staffs')
@Index(['staffId'])
@Index(['orderPOId', 'role'])
export class OrderPOStaff {
  @PrimaryColumn({ type: 'integer' })
  orderPOId!: number;

  @PrimaryColumn({ type: 'integer' })
  staffId!: number;

  @PrimaryColumn({
    type: 'enum',
    enum: OrderStaffRole,
  })
  role!: OrderStaffRole;

  @CreateDateColumn()
  assignedAt!: Date;

  @ManyToOne(() => OrderPO, (orderPO) => orderPO.staffLinks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderPOId' })
  orderPO!: OrderPO;

  @ManyToOne(() => Staff, (staff) => staff.orderLinks)
  @JoinColumn({ name: 'staffId' })
  staff!: Staff;
}
