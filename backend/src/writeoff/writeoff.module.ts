import { Module } from '@nestjs/common';
import { WriteOffController } from './writeoff.controller';
import { WriteOffService } from './writeoff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriteOffEntity } from '../entity/writeoff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WriteOffEntity])],
  providers: [WriteOffService],
  controllers: [WriteOffController],
  exports: [WriteOffService],
})
export class WriteOffModule {}