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
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const expense = await this.expenseService.findOne(Number(id));
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  @Post()
  create(@Body() createExpenseDto: Partial<any>) {
    return this.expenseService.create(createExpenseDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: Partial<any>,
  ) {
    const expense = await this.expenseService.update(
      Number(id),
      updateExpenseDto,
    );
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removed = await this.expenseService.remove(Number(id));
    if (!removed) {
      throw new NotFoundException('Expense not found');
    }
    return { deleted: true };
  }
}
