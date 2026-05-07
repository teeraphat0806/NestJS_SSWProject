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
import { QuotationService } from './quotation.service';

@Controller('quotations')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Get()
  findAll() {
    return this.quotationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quotation = await this.quotationService.findOne(Number(id));
    if (!quotation) {
      throw new NotFoundException('Quotation not found');
    }
    return quotation;
  }

  @Post()
  create(@Body() createQuotationDto: Partial<any>) {
    return this.quotationService.create(createQuotationDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuotationDto: Partial<any>,
  ) {
    const quotation = await this.quotationService.update(
      Number(id),
      updateQuotationDto,
    );
    if (!quotation) {
      throw new NotFoundException('Quotation not found');
    }
    return quotation;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.quotationService.remove(Number(id));
    if (!removed) {
      throw new NotFoundException('Quotation not found');
    }
    return { deleted: true };
  }
}
