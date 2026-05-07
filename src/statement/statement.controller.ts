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
import { StatementService } from './statement.service';

@Controller('statements')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Get()
  findAll() {
    return this.statementService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const statement = await this.statementService.findOne(Number(id));
    if (!statement) {
      throw new NotFoundException('Statement not found');
    }
    return statement;
  }

  @Post()
  create(@Body() createStatementDto: Partial<any>) {
    return this.statementService.create(createStatementDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStatementDto: Partial<any>,
  ) {
    const statement = await this.statementService.update(
      Number(id),
      updateStatementDto,
    );
    if (!statement) {
      throw new NotFoundException('Statement not found');
    }
    return statement;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.statementService.remove(Number(id));
    if (!removed) {
      throw new NotFoundException('Statement not found');
    }
    return { deleted: true };
  }
}
