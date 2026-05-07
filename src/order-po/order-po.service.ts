import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderPO } from './entities/order-po.entity';

@Injectable()
export class OrderPoService {
  constructor(
    @InjectRepository(OrderPO)
    private readonly orderPoRepository: Repository<OrderPO>,
  ) {}

  findAll(): Promise<OrderPO[]> {
    return this.orderPoRepository.find({
      relations: ['customer', 'staffLinks', 'products'],
    });
  }

  findOne(id: number): Promise<OrderPO | null> {
    return this.orderPoRepository.findOne({
      where: { id },
      relations: ['customer', 'staffLinks', 'products'],
    });
  }

  async create(createOrderPoDto: Partial<OrderPO>): Promise<OrderPO> {
    const orderPo = this.orderPoRepository.create(createOrderPoDto);
    return this.orderPoRepository.save(orderPo);
  }

  async update(
    id: number,
    updateOrderPoDto: Partial<OrderPO>,
  ): Promise<OrderPO | null> {
    const orderPo = await this.findOne(id);
    if (!orderPo) {
      return null;
    }

    Object.assign(orderPo, updateOrderPoDto);
    return this.orderPoRepository.save(orderPo);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.orderPoRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
