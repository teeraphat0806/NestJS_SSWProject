import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SteelType } from './entities/steel-type.entity';
import { SteelStock } from './entities/steel-stock.entity';
import { SteelService } from './steel.service';
import { SteelController } from './steel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SteelType, SteelStock])],
  controllers: [SteelController],
  providers: [SteelService],
  exports: [SteelService],
})
export class SteelModule {}
