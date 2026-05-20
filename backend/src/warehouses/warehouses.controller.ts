import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { WarehouseDto } from '../dto/warehouses-dto';
import { WarehousesService } from './warehouses.service';
import { WarehousesEntity } from '../entity/warehouses.entity';
import {WarehouseExceptionFilter} from "./warehouses.controller.exception";
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@ApiTags('Warehouses')
@ApiBearerAuth()
@Controller('warehouses')
export class WarehousesController {
  constructor(private warehousesService: WarehousesService) {}
  @Post()
  @UseFilters(WarehouseExceptionFilter)
  @ApiOperation({ summary: 'Создать склад' })
  create(@Body() createWarehouseDto: WarehouseDto): Promise<WarehousesEntity> {
    return this.warehousesService.create(createWarehouseDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Список складов' })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.warehousesService.findAll({ page: +page, limit: +limit });
  }
  @Get(':id')
  @ApiOperation({ summary: 'Склад по ID' })
  findOne(@Param('id') id: string): Promise<WarehousesEntity> {
    return this.warehousesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменить склад' })
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<WarehouseDto>,
  ): Promise<WarehousesEntity> {
    return this.warehousesService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить склад' })
  remove(@Param('id') id: string): Promise<void> {
    return this.warehousesService.remove(+id);
  }
}
