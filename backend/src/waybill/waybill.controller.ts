import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WaybillService } from './waybill.service';
import { WaybillEntity } from '../entity/waybill.entity';
import { WaybillDto } from '../dto/waybill-dto';
import { WaybillUpdatedDto } from '../dto/waybill.updated-dto';
import { JwtAuthGuard} from '../auth/jwt/jwt-auth.guard';

@Controller('waybill')
@UseGuards(JwtAuthGuard)
export class WaybillController {
  constructor(private readonly service: WaybillService) {}

  @Post()
  create(@Body() dto: WaybillDto, @Request() req): Promise<WaybillEntity> {
    return this.service.create(dto, req);
  }

  @Get()
  findAll(@Request() req): Promise<WaybillEntity[]> {
    return this.service.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.service.findOne(id, req);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: WaybillUpdatedDto, @Request() req,) {
    return this.service.update(id, dto, req);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.service.remove(id, req);
  }
}
