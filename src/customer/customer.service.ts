import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService implements OnModuleInit {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}
  findAll(): Promise<Customer[]> {
    {
      return this.repo.find();
    }
  }
  findOne(id: number): Promise<Customer | null> {
    return this.repo.findOne({ where: { id } });
  }

  async onModuleInit() {
    // Seed data commented out - define proper address values before uncommenting
    // const count = await this.repo.count();
    // if (count === 0) {
    //   const items: Partial<Customer>[] = [
    //     { id: 1, name: 'John Doe', email: 'john.doe@example.com', address: '' },
    //     { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', address: '' },
    //     { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', address: '' },
    //     { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', address: '' },
    //   ];
    //   await this.repo.save(items);
    // }
  }

  async search(q: string): Promise<Customer[]> {
    return this.repo
      .createQueryBuilder('customer')
      .where('customer.name LIKE :q', { q: `%${q}%` })
      .orWhere('customer.email LIKE :q', { q: `%${q}%` })
      .orWhere('customer.phone LIKE :q', { q: `%${q}%` })
      .orWhere('customer.address LIKE :q', { q: `%${q}%` })
      .getMany();
  }
}
