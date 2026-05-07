import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { JobPosition } from './entities/job-position.entity';
import { StaffEmployment } from './entities/staff-employment.entity';
import { StaffSalary } from './entities/staff-salary.entity';
import { StaffIncome } from './entities/staff-income.entity';
import { TypeStaffIncome } from './entities/type-staff-income.entity';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Staff,
      JobPosition,
      StaffEmployment,
      StaffSalary,
      StaffIncome,
      TypeStaffIncome,
    ]),
  ],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
