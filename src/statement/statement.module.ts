import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statement } from './entities/statement.entity';
import { StatementInvoice } from './entities/statement-invoice.entity';
import { StatementService } from './statement.service';
import { StatementController } from './statement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Statement, StatementInvoice])],
  controllers: [StatementController],
  providers: [StatementService],
  exports: [StatementService],
})
export class StatementModule {}
