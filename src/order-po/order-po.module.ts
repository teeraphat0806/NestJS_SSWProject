import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderPO } from './entities/order-po.entity';
import { Invoice } from './entities/invoice.entity';
import { OrderPOStaff } from './entities/order-po-staff.entity';
import { OrderPoService } from './order-po.service';
import { OrderPoController } from './order-po.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderPO, Invoice, OrderPOStaff])],
  controllers: [OrderPoController],
  providers: [OrderPoService],
  exports: [OrderPoService],
})
export class OrderPoModule {}
