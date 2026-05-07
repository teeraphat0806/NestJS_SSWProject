import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { CuttingMethod } from '../../common/enums';
import { OrderPO } from '../../order-po/entities/order-po.entity';
import { SteelType } from '../../steel/entities/steel-type.entity';

@Entity('products')
@Unique(['orderPOId', 'sequence'])
@Index(['orderPOId'])
@Index(['steelId'])
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  orderPOId!: number;

  @Column({ type: 'integer' })
  steelId!: number;

  @Column({ type: 'float', nullable: true })
  wide?: number;

  @Column({ type: 'float', nullable: true })
  length?: number;

  @Column({ type: 'float', nullable: true })
  thickness?: number;

  @Column({ type: 'integer' })
  amount!: number;

  @Column({ type: 'varchar', nullable: true })
  detail?: string;

  @Column({ type: 'varchar', nullable: true })
  surfaceT?: string;

  @Column({ type: 'varchar', nullable: true })
  toleranceT?: string;

  @Column({ type: 'varchar', nullable: true })
  surfaceW?: string;

  @Column({ type: 'varchar', nullable: true })
  toleranceW?: string;

  @Column({ type: 'varchar', nullable: true })
  surfaceL?: string;

  @Column({ type: 'varchar', nullable: true })
  toleranceL?: string;

  @Column({ type: 'float', nullable: true })
  actualWeight?: number;

  @Column({ type: 'float', nullable: true })
  total?: number;

  @Column({
    type: 'enum',
    enum: CuttingMethod,
    default: CuttingMethod.NORMAL,
  })
  cuttingMethod!: CuttingMethod;

  @Column({ type: 'varchar', nullable: true })
  job?: string;

  @Column({ type: 'float', nullable: true })
  discount?: number;

  @Column({ type: 'float', default: 0 })
  unitPrice!: number;

  @Column({ type: 'boolean', default: false })
  isOD!: boolean;

  @Column({ type: 'boolean', default: false })
  isPerAmount!: boolean;

  @Column({ type: 'boolean', default: false })
  isServices!: boolean;

  @Column({ type: 'integer' })
  sequence!: number;

  @ManyToOne(() => OrderPO, (orderPO) => orderPO.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderPOId' })
  orderPO!: OrderPO;

  @ManyToOne(() => SteelType, (steelType) => steelType.products)
  @JoinColumn({ name: 'steelId' })
  steelType!: SteelType;
}
