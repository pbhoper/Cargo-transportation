import { TthService } from './tth.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTthDto } from '../dto/tth.create-dto';
import {TthUpdateDto} from "../dto/tth.update-dto";

@Controller('tth')
export class TthController {
constructor(private tthService: TthService) {}

  @Post()
  create(@Body() createTthDto: CreateTthDto) {
  return this.tthService.create(createTthDto);
  }

  @Get()
  findAll() {
    return this.tthService.findAll()
  }

  @Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tthService.findOne(id)
}

 @Get('number/:number')
  findNumber(@Param('number', ParseIntPipe) number: number) {
  return this.tthService.searchNumber(number);
 }

 @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTthDto: TthUpdateDto,
 )
 {
   return this.tthService.update(id, updateTthDto);
 }

 @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
  return this.tthService.remove(id);
 }
}