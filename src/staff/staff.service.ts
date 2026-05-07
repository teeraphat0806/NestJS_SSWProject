import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  findAll(): Promise<Staff[]> {
    return this.staffRepository.find({
      relations: ['user', 'jobPosition', 'employments', 'expenses'],
    });
  }

  findOne(id: number): Promise<Staff | null> {
    return this.staffRepository.findOne({
      where: { id },
      relations: ['user', 'jobPosition', 'employments', 'expenses'],
    });
  }

  findByCode(code: string): Promise<Staff | null> {
    return this.staffRepository.findOne({
      where: { code },
      relations: ['user', 'jobPosition'],
    });
  }

  async create(createStaffDto: Partial<Staff>): Promise<Staff> {
    const staff = this.staffRepository.create(createStaffDto);
    return this.staffRepository.save(staff);
  }

  async update(
    id: number,
    updateStaffDto: Partial<Staff>,
  ): Promise<Staff | null> {
    const staff = await this.findOne(id);
    if (!staff) {
      return null;
    }

    Object.assign(staff, updateStaffDto);
    return this.staffRepository.save(staff);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.staffRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
