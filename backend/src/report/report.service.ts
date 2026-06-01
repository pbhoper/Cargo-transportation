import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';
import type { Response } from 'express';
import { Repository } from 'typeorm';
import { ReportDto } from '../dto/report-dto';
import { ReportEntity } from '../entity/report.entity';
import { TthEntity } from '../entity/tth.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
    @InjectRepository(TthEntity)
    private readonly tthRepository: Repository<TthEntity>,
  ) {}

  private createWorkbook(): ExcelJS.Workbook {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Logistics System';
    return workbook;
  }

  private styleSheet(sheet: ExcelJS.Worksheet) {
    sheet.getRow(1).font = { bold: true };

    sheet.getRow(1).alignment = {
      horizontal: 'center',
    };

    sheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F2F2F2' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  }

  private async finalizeResponse(
    workbook: ExcelJS.Workbook,
    res: Response,
    name: string,
  ) {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader('Content-Disposition', `attachment; filename=${name}.xlsx`);

    await workbook.xlsx.write(res);

    res.end();
  }

  private async saveReportQuery(query: ReportDto, userId: number) {
    await this.reportRepository.save({
      startDate: query.startDate,
      endDate: query.endDate,
      clientId: query.clientId,
      userId,
    });
  }

  async generateWaybillsReport(query: ReportDto, res: Response, userId: number) {

    await this.saveReportQuery(query, userId);

    const ttns = await this.tthRepository.find({
      where: {
        userId,
      },
    });

    const workbook = this.createWorkbook();
    const sheet = workbook.addWorksheet('waybills');

    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'TTN Number', key: 'ttn', width: 15 },
      { header: 'Sender', key: 'sender', width: 20 },
      { header: 'Receiver', key: 'receiver', width: 20 },
      { header: 'Vehicle', key: 'car', width: 15 },
      { header: 'Driver', key: 'driver', width: 25 },
      { header: 'Departure Date', key: 'date', width: 15 },
    ];

    sheet.addRows(
      ttns.map((t) => ({
        id: t.id,
        ttn: t.number || '',
        sender: t.senderName || '',
        receiver: t.recipientName || '',
        car: t.vehicleBrandModel || '',
        driver: t.driverFullName || '',
        date: t.dateCreated,
      })),
    );

    this.styleSheet(sheet);

    await this.finalizeResponse(workbook, res, 'waybills-report');
  }

  async generateLossesReport(query: ReportDto, res: Response, userId: number) {
    await this.saveReportQuery(query, userId);

    const workbook = this.createWorkbook();
    const sheet = workbook.addWorksheet('losses');

    sheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'TTN', key: 'ttn', width: 15 },
      { header: 'Product', key: 'product', width: 25 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Total Loss', key: 'total', width: 15 },
      { header: 'Responsible Person', key: 'responsible', width: 25 },
    ];

    sheet.addRows([]);

    this.styleSheet(sheet);

    await this.finalizeResponse(workbook, res, 'losses-report');
  }

  async generateLossesByDriverReport(query: ReportDto, res: Response, userId: number) {
    await this.saveReportQuery(query, userId);

    const workbook = this.createWorkbook();
    const sheet = workbook.addWorksheet('losses-by-driver');

    sheet.columns = [
      { header: 'Driver Full Name', key: 'driver', width: 35 },
      { header: 'Total Loss Sum', key: 'totalAmount', width: 20 },
    ];

    sheet.addRows([]);

    this.styleSheet(sheet);

    await this.finalizeResponse(workbook, res, 'losses-by-driver');
  }

  async generateProfitReport(query: ReportDto, res: Response, userId: number) {
    await this.saveReportQuery(query, userId);

    const workbook = this.createWorkbook();
    const sheet = workbook.addWorksheet('profit');

    sheet.columns = [
      { header: 'Period', key: 'period', width: 30 },
      { header: 'Revenue', key: 'revenue', width: 15 },
      { header: 'Expenses', key: 'expenses', width: 15 },
      { header: 'Net Profit', key: 'profit', width: 15 },
    ];

    sheet.addRows([]);

    this.styleSheet(sheet);

    await this.finalizeResponse(workbook, res, 'profit-report');
  }

  async generateClientStatsReport(query: ReportDto, res: Response, userId: number) {
    await this.saveReportQuery(query, userId);

    const workbook = this.createWorkbook();
    const sheet = workbook.addWorksheet('client-statistics');

    sheet.columns = [
      { header: 'Total Clients', key: 'total', width: 15 },
      { header: 'New Clients', key: 'new', width: 15 },
      { header: 'Lost Clients', key: 'lost', width: 15 },
      { header: 'Service Profit', key: 'profit', width: 15 },
    ];

    sheet.addRows([]);

    this.styleSheet(sheet);

    await this.finalizeResponse(workbook, res, 'client-statistics');
  }
}