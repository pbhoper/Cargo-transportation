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
import { Role } from '../enum/roles.enum';
import { RolesGuard } from '../guard/roles.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import {WarehouseExceptionFilter} from "./warehouses.controller.exception";

@ApiTags('Warehouses')
@ApiBearerAuth()
@Controller('warehouses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WarehousesController {
  constructor(private warehousesService: WarehousesService) {}
  @Post()
  @Roles(Role.Admin)
  @UseFilters(WarehouseExceptionFilter)
  @ApiOperation({ summary: 'Создать склад' })
  create(@Body() createWarehouseDto: WarehouseDto): Promise<WarehousesEntity> {
    return this.warehousesService.create(createWarehouseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Список складов' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<any> {
    return this.warehousesService.findAll({ page: +page, limit: +limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Склад по ID' })
  findOne(@Param('id') id: string): Promise<WarehousesEntity> {
    return this.warehousesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Изменить склад' })
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<WarehouseDto>,
  ): Promise<WarehousesEntity> {
    return this.warehousesService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Удалить склад' })
  remove(@Param('id') id: string): Promise<void> {
    return this.warehousesService.remove(+id);
  }
}
