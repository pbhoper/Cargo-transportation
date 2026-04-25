import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { WaybillService } from './waybill.service';
import { WaybillEntity } from '../entity/waybill.entity';


@Controller('waybill')
export class WaybillController {
  constructor(private readonly waybillService: WaybillService) {}

  @Post()
  create(@Body() WaybillDto: Partial<WaybillEntity>): Promise<WaybillEntity> {
    return this.waybillService.create(WaybillDto);
  }

  @Get()
  findAll(): Promise<WaybillEntity[]> {
    return this.waybillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<WaybillEntity> {
    return this.waybillService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWaybillDto: Partial<WaybillEntity>,
  ): Promise<WaybillEntity> {
    return this.waybillService.update(id, updateWaybillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.waybillService.remove(id);
  }
}