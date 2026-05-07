import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  findAll(): Promise<Bill[]> {
    return this.billRepository.find({
      relations: ['customer', 'Staff_Bill_salesNameToStaff'],
    });
  }

  findOne(id: number): Promise<Bill | null> {
    return this.billRepository.findOne({
      where: { id },
      relations: ['customer', 'Staff_Bill_salesNameToStaff'],
    });
  }

  async create(createBillDto: Partial<Bill>): Promise<Bill> {
    const bill = this.billRepository.create(createBillDto);
    return this.billRepository.save(bill);
  }

  async update(id: number, updateBillDto: Partial<Bill>): Promise<Bill | null> {
    const bill = await this.findOne(id);
    if (!bill) {
      return null;
    }

    Object.assign(bill, updateBillDto);
    return this.billRepository.save(bill);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.billRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
