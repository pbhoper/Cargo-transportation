import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ReportService } from './report.service';
import { ReportDto } from '../dto/report-dto';

@Controller('report')
export class ReportsController {
  constructor(private readonly reportsService: ReportService) {}

  @Get('waybill')
  async getWaybills(@Query() query: ReportDto, @Res() res: Response) {
    return this.reportsService.generateWaybillsReport(query, res);
  }

  @Get('losses')
  async getLosses(@Query() query: ReportDto, @Res() res: Response) {
    return this.reportsService.generateLossesReport(query, res);
  }

  @Get('losses-by-driver')
  async getLossesByDriver(@Query() query: ReportDto, @Res() res: Response) {
    return this.reportsService.generateLossesByDriverReport(query, res);
  }

  @Get('profit')
  async getProfit(@Query() query: ReportDto, @Res() res: Response) {
    return this.reportsService.generateProfitReport(query, res);
  }

  @Get('client-stats')
  async getClientStats(@Query() query: ReportDto, @Res() res: Response) {
    return this.reportsService.generateClientStatsReport(query, res);
  }
}