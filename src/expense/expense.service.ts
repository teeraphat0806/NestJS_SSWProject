import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  findAll(): Promise<Expense[]> {
    return this.expenseRepository.find({
      relations: ['staff', 'category'],
    });
  }

  findOne(id: number): Promise<Expense | null> {
    return this.expenseRepository.findOne({
      where: { id },
      relations: ['staff', 'category'],
    });
  }

  async create(createExpenseDto: Partial<Expense>): Promise<Expense> {
    const expense = this.expenseRepository.create(createExpenseDto);
    return this.expenseRepository.save(expense);
  }

  async update(
    id: number,
    updateExpenseDto: Partial<Expense>,
  ): Promise<Expense | null> {
    const expense = await this.findOne(id);
    if (!expense) {
      return null;
    }

    Object.assign(expense, updateExpenseDto);
    return this.expenseRepository.save(expense);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.expenseRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
