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
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const staff = await this.staffService.findOne(Number(id));
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  @Post()
  create(@Body() createStaffDto: Partial<any>) {
    return this.staffService.create(createStaffDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStaffDto: Partial<any>) {
    const staff = await this.staffService.update(Number(id), updateStaffDto);
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.staffService.remove(Number(id));
    if (!removed) {
      throw new NotFoundException('Staff not found');
    }
    return { deleted: true };
  }
}
