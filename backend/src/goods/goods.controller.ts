import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsDto} from '../dto/goods-dto';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  create(@Body() createGoodsDto: GoodsDto) {
    return this.goodsService.create(createGoodsDto);
  }

  @Get()
  findAll() {
    return this.goodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGoodsDto: Partial<GoodsDto>,
  ) {
    return this.goodsService.update(id, updateGoodsDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.remove(id);
  }
}
