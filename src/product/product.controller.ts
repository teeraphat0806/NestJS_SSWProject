import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const prod = await this.service.findOne(Number(id));
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }
}
