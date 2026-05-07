import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Acquittance } from './entities/acquittance.entity';

@Injectable()
export class AcquittanceService {
  constructor(
    @InjectRepository(Acquittance)
    private readonly acquittanceRepository: Repository<Acquittance>,
  ) {}

  findAll(): Promise<Acquittance[]> {
    return this.acquittanceRepository.find({
      relations: ['customer', 'items'],
    });
  }

  findOne(id: number): Promise<Acquittance | null> {
    return this.acquittanceRepository.findOne({
      where: { id },
      relations: ['customer', 'items'],
    });
  }

  async create(
    createAcquittanceDto: Partial<Acquittance>,
  ): Promise<Acquittance> {
    const acquittance = this.acquittanceRepository.create(createAcquittanceDto);
    return this.acquittanceRepository.save(acquittance);
  }

  async update(
    id: number,
    updateAcquittanceDto: Partial<Acquittance>,
  ): Promise<Acquittance | null> {
    const acquittance = await this.findOne(id);
    if (!acquittance) {
      return null;
    }

    Object.assign(acquittance, updateAcquittanceDto);
    return this.acquittanceRepository.save(acquittance);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.acquittanceRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
