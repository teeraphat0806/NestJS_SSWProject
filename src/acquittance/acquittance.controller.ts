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
import { AcquittanceService } from './acquittance.service';

@Controller('acquittances')
export class AcquittanceController {
  constructor(private readonly acquittanceService: AcquittanceService) {}

  @Get()
  findAll() {
    return this.acquittanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const acquittance = await this.acquittanceService.findOne(Number(id));
    if (!acquittance) {
      throw new NotFoundException('Acquittance not found');
    }
    return acquittance;
  }

  @Post()
  create(@Body() createAcquittanceDto: Partial<any>) {
    return this.acquittanceService.create(createAcquittanceDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAcquittanceDto: Partial<any>,
  ) {
    const acquittance = await this.acquittanceService.update(
      Number(id),
      updateAcquittanceDto,
    );
    if (!acquittance) {
      throw new NotFoundException('Acquittance not found');
    }
    return acquittance;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.acquittanceService.remove(Number(id));
    if (!removed) {
      throw new NotFoundException('Acquittance not found');
    }
    return { deleted: true };
  }
}
