import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderPoService } from './order-po.service';

@Controller('order-pos')
export class OrderPoController {
  constructor(private readonly orderPoService: OrderPoService) {}

  @Get()
  findAll() {
    return this.orderPoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const orderPo = await this.orderPoService.findOne(Number(id));
    if (!orderPo) {
      throw new NotFoundException('OrderPO not found');
    }
    return orderPo;
  }

  @Post()
  create(@Body() createOrderPoDto: Partial<any>) {
    return this.orderPoService.create(createOrderPoDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderPoDto: Partial<any>,
  ) {
    const orderPo = await this.orderPoService.update(
      Number(id),
      updateOrderPoDto,
    );
    if (!orderPo) {
      throw new NotFoundException('OrderPO not found');
    }
    return orderPo;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.orderPoService.remove(Number(id));
    if (!removed) {
      throw new NotFoundException('OrderPO not found');
    }
    return { deleted: true };
  }
}
