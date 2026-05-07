import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SteelType } from './entities/steel-type.entity';

@Injectable()
export class SteelService {
  constructor(
    @InjectRepository(SteelType)
    private readonly steelTypeRepository: Repository<SteelType>,
  ) {}

  findAll(): Promise<SteelType[]> {
    return this.steelTypeRepository.find({ relations: ['stocks'] });
  }

  findOne(id: number): Promise<SteelType | null> {
    return this.steelTypeRepository.findOne({
      where: { id },
      relations: ['stocks'],
    });
  }

  async create(createSteelTypeDto: Partial<SteelType>): Promise<SteelType> {
    const steelType = this.steelTypeRepository.create(createSteelTypeDto);
    return this.steelTypeRepository.save(steelType);
  }

  async update(
    id: number,
    updateSteelTypeDto: Partial<SteelType>,
  ): Promise<SteelType | null> {
    const steelType = await this.findOne(id);
    if (!steelType) {
      return null;
    }

    Object.assign(steelType, updateSteelTypeDto);
    return this.steelTypeRepository.save(steelType);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.steelTypeRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
