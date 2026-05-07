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
import { BillService } from './bill.service';

@Controller('bills')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const bill = await this.billService.findOne(Number(id));
    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    return bill;
  }

  @Post()
  create(@Body() createBillDto: Partial<any>) {
    return this.billService.create(createBillDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBillDto: Partial<any>) {
    const bill = await this.billService.update(Number(id), updateBillDto);
    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    return bill;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.billService.remove(Number(id));
    if (!removed) {
      throw new NotFoundException('Bill not found');
    }
    return { deleted: true };
  }
}
