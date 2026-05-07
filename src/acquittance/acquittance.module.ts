import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acquittance } from './entities/acquittance.entity';
import { AcquittanceInvoice } from './entities/acquittance-invoice.entity';
import { AcquittanceService } from './acquittance.service';
import { AcquittanceController } from './acquittance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Acquittance, AcquittanceInvoice])],
  controllers: [AcquittanceController],
  providers: [AcquittanceService],
  exports: [AcquittanceService],
})
export class AcquittanceModule {}
