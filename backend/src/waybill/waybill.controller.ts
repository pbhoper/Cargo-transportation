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
import { WaybillDto} from '../dto/waybill-dto';
import { WaybillUpdatedDto } from '../dto/waybill.updated-dto';

@Controller('waybill')
export class WaybillController {
  constructor(private readonly service: WaybillService) {}

  @Post()
  create(@Body() dto: WaybillDto): Promise<WaybillEntity> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<WaybillEntity[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: WaybillUpdatedDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
