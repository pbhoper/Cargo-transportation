import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './report.controller';
import { ReportService } from './report.service';
import { ReportEntity} from '../entity/report.entity';
import { TthEntity } from '../entity/tth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, TthEntity])],
  controllers: [ReportsController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
