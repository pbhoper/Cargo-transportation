import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { WriteOffService } from './writeoff.service';
import {WriteoffCreateDto } from '../dto/writeoff.create-dto';
import {UpdateWriteOffDto } from '../dto/writeoff.update-dto';
import { WriteOffEntity } from '../entity/writeoff.entity';

@ApiTags('writeOffs')
@Controller('writeOffs')
export class WriteOffController {
  constructor(private readonly writeOffService: WriteOffService) {}

  @Post()
  @ApiOperation({ summary: 'Создать акт списания' })
  @ApiResponse({
    description: 'Акт списания успешно создан.',
    type: WriteOffEntity,
  })
  async create(@Body() dto: WriteoffCreateDto) {
    return await this.writeOffService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список актов списания' })
  @ApiResponse({
    description: 'Список актов списания',
    type: WriteOffEntity,
  })
  async findAll(@Query('page') page?: number) {
    return await this.writeOffService.findAll(page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить акт списания по ID' })
  @ApiResponse({
    description: 'Акт списания найден',
    type: WriteOffEntity,
  })
  @ApiResponse({
    description: 'Акт списания не найден',
  })
  async findOne(@Param('id') id: number) {
    return await this.writeOffService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить акт' })
  @ApiBody({ type: UpdateWriteOffDto })
  @ApiResponse({
    description: 'Акт обновлен',
    type: WriteOffEntity,
  })
  @ApiResponse({
    description: 'Акт списания не найден',
  })
  async update(@Param('id') id: number, @Body() dto: UpdateWriteOffDto) {
    return await this.writeOffService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить акт' })
  @ApiResponse({
    description: 'Акт удален',
    type: WriteOffEntity,
  })
  @ApiResponse({
    description: 'Акт списания не найден',
  })
  async delete(@Param('id') id: number) {
    return await this.writeOffService.delete(id);
  }
}
