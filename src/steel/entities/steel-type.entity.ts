import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { ShapeSteel, SteelStatus } from '../../common/enums';
import { Product } from '../../product/entities/product.entity';
import { SteelStock } from './steel-stock.entity';

@Entity('steel_types')
@Unique(['codeSteel', 'shape'])
export class SteelType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  codeSteel!: string;

  @Column({ type: 'varchar', nullable: true })
  detail?: string;

  @Column({ type: 'integer', default: 0 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: ShapeSteel,
    default: ShapeSteel.SQUARE,
  })
  shape!: ShapeSteel;

  @Column({ type: 'float' })
  price!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'float' })
  density!: number;

  @Column({ type: 'boolean', default: true })
  requiresDimensions!: boolean;

  @Column({ type: 'boolean', default: true })
  requiresAmount!: boolean;

  @Column({
    type: 'enum',
    enum: SteelStatus,
    default: SteelStatus.ACTIVE,
  })
  status!: SteelStatus;

  @OneToMany(() => Product, (product) => product.steelType)
  products!: Product[];

  @OneToMany(() => SteelStock, (stock) => stock.steelType)
  stocks!: SteelStock[];
}
