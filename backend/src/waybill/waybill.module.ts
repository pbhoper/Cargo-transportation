import { Module } from '@nestjs/common';
import { WaybillController } from './waybill.controller';
import { WaybillService } from './waybill.service';
import { WaybillEntity } from '../entity/waybill.entity';
import { TthEntity } from '../entity/tth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WaybillEntity, TthEntity])],
  controllers: [WaybillController],
  providers: [WaybillService],
  exports: [WaybillService],
})
export class WaybillModule {}
