import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehousesEntity } from '../entity/warehouses.entity';
import { RolesGuard } from '../guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
  imports: [TypeOrmModule.forFeature([WarehousesEntity])],
  controllers: [WarehousesController],
  providers: [
    WarehousesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [WarehousesService],
})
export class WarehousesModule {}
