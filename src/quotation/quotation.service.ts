import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quotation } from './entities/quotation.entity';

@Injectable()
export class QuotationService {
  constructor(
    @InjectRepository(Quotation)
    private readonly quotationRepository: Repository<Quotation>,
  ) {}

  findAll(): Promise<Quotation[]> {
    return this.quotationRepository.find({ relations: ['customer', 'staff'] });
  }

  findOne(id: number): Promise<Quotation | null> {
    return this.quotationRepository.findOne({
      where: { id },
      relations: ['customer', 'staff'],
    });
  }

  async create(createQuotationDto: Partial<Quotation>): Promise<Quotation> {
    const quotation = this.quotationRepository.create(createQuotationDto);
    return this.quotationRepository.save(quotation);
  }

  async update(
    id: number,
    updateQuotationDto: Partial<Quotation>,
  ): Promise<Quotation | null> {
    const quotation = await this.findOne(id);
    if (!quotation) {
      return null;
    }

    Object.assign(quotation, updateQuotationDto);
    return this.quotationRepository.save(quotation);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.quotationRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
