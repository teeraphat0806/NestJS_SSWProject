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
import { SteelService } from './steel.service';

@Controller('steel-types')
export class SteelController {
  constructor(private readonly steelService: SteelService) {}

  @Get()
  findAll() {
    return this.steelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const steelType = await this.steelService.findOne(Number(id));
    if (!steelType) {
      throw new NotFoundException('Steel Type not found');
    }
    return steelType;
  }

  @Post()
  create(@Body() createSteelTypeDto: Partial<any>) {
    return this.steelService.create(createSteelTypeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSteelTypeDto: Partial<any>,
  ) {
    const steelType = await this.steelService.update(
      Number(id),
      updateSteelTypeDto,
    );
    if (!steelType) {
      throw new NotFoundException('Steel Type not found');
    }
    return steelType;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.steelService.remove(Number(id));
    if (!removed) {
      throw new NotFoundException('Steel Type not found');
    }
    return { deleted: true };
  }
}
