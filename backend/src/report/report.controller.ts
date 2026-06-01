import {
  Controller,
  Get,
  Query,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ReportDto } from '../dto/report-dto';
import { ReportService } from './report.service';
import { JwtAuthGuard} from '../auth/jwt/jwt-auth.guard';

@Controller('report')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportService) {}

  @Get('waybill')
  async getWaybills(
    @Query() query: ReportDto,
    @Res({ passthrough: true }) res: Response,
    @Request() req,) {
    return this.reportsService.generateWaybillsReport(query, res, req.user.userId,);
  }

  @Get('losses')
  async getLosses(
    @Query() query: ReportDto,
    @Res({ passthrough: true }) res: Response,
    @Request() req,) {
    return this.reportsService.generateLossesReport(query, res, req.user.userId,);
  }

  @Get('losses-by-driver')
  async getLossesByDriver(
    @Query() query: ReportDto,
    @Res({ passthrough: true }) res: Response,
    @Request() req,) {
    return this.reportsService.generateLossesByDriverReport(query, res, req.user.userId,);
  }

  @Get('profit')
  async getProfit(
    @Query() query: ReportDto,
    @Res({ passthrough: true }) res: Response,
    @Request() req,) {
    return this.reportsService.generateProfitReport(query, res, req.user.userId,);
  }

  @Get('client-stats')
  async getClientStats(
    @Query() query: ReportDto,
    @Res({ passthrough: true }) res: Response,
    @Request() req,) {
    return this.reportsService.generateClientStatsReport(query, res, req.user.userId,);
  }
}
