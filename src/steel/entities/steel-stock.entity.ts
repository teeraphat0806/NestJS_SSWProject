import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { StockStatus } from '../../common/enums';
import { SteelType } from './steel-type.entity';

@Entity('steel_stocks')
@Unique(['steeltypeId', 'width', 'length', 'thickness'])
export class SteelStock {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer', nullable: true })
  width?: number;

  @Column({ type: 'integer', nullable: true })
  length?: number;

  @Column({ type: 'integer', nullable: true })
  thickness?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'integer' })
  steeltypeId?: number;

  @Column({
    type: 'enum',
    enum: StockStatus,
    default: StockStatus.AVAILABLE,
  })
  status?: StockStatus;

  @Column({ type: 'integer', default: 0 })
  quantity?: number;

  @ManyToOne(() => SteelType, (steelType) => steelType.stocks)
  @JoinColumn({ name: 'steeltypeId' })
  steelType?: SteelType;
}
