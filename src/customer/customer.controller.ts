import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const cust = await this.service.findOne(Number(id));
    if (!cust) throw new NotFoundException('Customer not found');
    return cust;
  }

  @Get('search/:q')
  async search(@Param('q') q: string) {
    return this.service.search(q);
  }
}
