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
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateTthDto } from '../dto/tth.create-dto';
import { TthUpdateDto } from '../dto/tth.update-dto';
import { JwtAuthGuard} from '../auth/jwt/jwt-auth.guard';

@Controller('tth')
@UseGuards(JwtAuthGuard)
export class TthController {
  constructor(private tthService: TthService) {}

  @Post()
  create(@Body() createTthDto: CreateTthDto, @Request() req) {
    return this.tthService.create(
      createTthDto,
      req.user.sub || req.user.userId,
    );
  }

  @Get()
  findAll(@Request() req) {
    return this.tthService.findAll(req.user.sub || req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tthService.findOne(id, req.user.sub || req.user.userId);
  }

  @Get('number/:number')
  findNumber(@Param('number', ParseIntPipe) number: number, @Request() req) {
    return this.tthService.searchNumber(
      String(number),
      req.user.sub || req.user.userId,
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTthDto: TthUpdateDto,
    @Request() req,
  ) {
    return this.tthService.update(
      id,
      updateTthDto,
      req.user.sub || req.user.userId,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tthService.remove(id, req.user.sub || req.user.userId);
  }
}
