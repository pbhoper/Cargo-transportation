import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TthEntity } from '../entity/tth.entity';
import { TthController } from './tth.controller';
import { TthService } from './tth.service';


@Module({
 imports: [TypeOrmModule.forFeature([TthEntity])],
  controllers: [TthController],
  providers: [TthService],
  exports: [TthService],
})
export class TthModule {}
