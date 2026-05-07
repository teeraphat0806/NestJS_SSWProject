import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statement } from './entities/statement.entity';

@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(Statement)
    private readonly statementRepository: Repository<Statement>,
  ) {}

  findAll(): Promise<Statement[]> {
    return this.statementRepository.find({
      relations: ['customer', 'items'],
    });
  }

  findOne(id: number): Promise<Statement | null> {
    return this.statementRepository.findOne({
      where: { id },
      relations: ['customer', 'items'],
    });
  }

  async create(createStatementDto: Partial<Statement>): Promise<Statement> {
    const statement = this.statementRepository.create(createStatementDto);
    return this.statementRepository.save(statement);
  }

  async update(
    id: number,
    updateStatementDto: Partial<Statement>,
  ): Promise<Statement | null> {
    const statement = await this.findOne(id);
    if (!statement) {
      return null;
    }

    Object.assign(statement, updateStatementDto);
    return this.statementRepository.save(statement);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.statementRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
