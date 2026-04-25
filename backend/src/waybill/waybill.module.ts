import { Module } from '@nestjs/common';
import { WaybillController } from './waybill.controller';
import { WaybillService } from './waybill.service';
import { WaybillEntity } from '../entity/waybill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([WaybillEntity])],
  controllers: [WaybillController],
  providers: [WaybillService],
  exports: [WaybillService],
})
export class WaybillModule {}