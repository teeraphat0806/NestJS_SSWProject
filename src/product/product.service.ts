import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.repo.findOneBy({ id });
  }

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      const items: Partial<Product>[] = [
        { name: 'Sample A', description: 'Example product A', price: 9.99 },
        { name: 'Sample B', description: 'Example product B', price: 19.99 },
      ];
      for (const it of items) {
        const p = this.repo.create(it as Product);
        await this.repo.save(p);
      }
    }
  }
}
