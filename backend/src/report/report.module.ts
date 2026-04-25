import { Module } from '@nestjs/common';
import { ReportsController } from './report.controller'
import { ReportService } from './report.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
