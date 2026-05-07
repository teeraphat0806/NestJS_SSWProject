import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module'; // - เก็บของเดิมไว้
import { CustomerModule } from './customer/customer.module'; //
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { QuotationModule } from './quotation/quotation.module';
import { BillModule } from './bill/bill.module';
import { OrderPoModule } from './order-po/order-po.module';
import { StatementModule } from './statement/statement.module';
import { AcquittanceModule } from './acquittance/acquittance.module';
import { SteelModule } from './steel/steel.module';
import { ExpenseModule } from './expense/expense.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // เปลี่ยนจาก sqlite เป็น postgres
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'myuser', // ตามที่ตั้งใน docker-compose.yml
      password: process.env.DB_PASS || 'postgres', // ตามที่ตั้งใน docker-compose.yml
      database: process.env.DB_NAME || 'mydatabase', // ตามที่ตั้งใน docker-compose.yml
      autoLoadEntities: true, //
      synchronize: (process.env.TYPEORM_SYNC || 'true') === 'true', // ให้ TypeORM สร้าง Table จาก Entity ให้อัตโนมัติ
      logging: (process.env.TYPEORM_LOGGING || 'false') === 'true',
    }),
    ProductModule,
    CustomerModule,
    UserModule,
    AuthModule,
    StaffModule,
    QuotationModule,
    BillModule,
    OrderPoModule,
    StatementModule,
    AcquittanceModule,
    SteelModule,
    ExpenseModule,
  ],
  controllers: [AppController], // - เก็บไว้เหมือนเดิม
  providers: [AppService], // - เก็บไว้เหมือนเดิม
})
export class AppModule {}
