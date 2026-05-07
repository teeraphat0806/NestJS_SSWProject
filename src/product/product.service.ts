import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Product } from '../product/entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';

import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  onModuleInit() {
    console.log('ProductService initialized');
  }

  async findAll(): Promise<Product[]> {
    return await this.repo.find({
      relations: ['orderPO', 'steelType'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repo.findOne({
      where: { id },

      relations: ['orderPO', 'steelType'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.repo.create(dto);

    return await this.repo.save(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    Object.assign(product, dto);

    return await this.repo.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);

    await this.repo.remove(product);
  }
}
