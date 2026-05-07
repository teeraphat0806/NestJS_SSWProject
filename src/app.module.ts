import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module'; // - เก็บของเดิมไว้
import { CustomerModule } from './customer/customer.module'; //
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // เปลี่ยนจาก sqlite เป็น postgres
      host: 'localhost',
      port: 5432,
      username: 'myuser', // ตามที่ตั้งใน docker-compose.yml
      password: 'postgres', // ตามที่ตั้งใน docker-compose.yml
      database: 'mydatabase', // ตามที่ตั้งใน docker-compose.yml
      autoLoadEntities: true, //
      synchronize: true, // ให้ TypeORM สร้าง Table จาก Entity ให้อัตโนมัติ
    }),
    ProductModule,
    CustomerModule,
  ],
  controllers: [AppController], // - เก็บไว้เหมือนเดิม
  providers: [AppService], // - เก็บไว้เหมือนเดิม
})
export class AppModule {}
