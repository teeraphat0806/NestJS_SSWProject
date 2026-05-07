import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { CustomerContact } from './entities/customer-contact.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerContact])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
