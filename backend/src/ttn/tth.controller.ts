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
import { TthService } from './tth.service';
import { CreateTthDto } from '../dto/tth.create-dto';
import { TthUpdateDto } from '../dto/tth.update-dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('tth')
@UseGuards(JwtAuthGuard)
export class TthController {
  constructor(private readonly tthService: TthService) {}

  @Post()
  create(@Body() createTthDto: CreateTthDto, @Request() req) {
    const userId = req.user.sub || req.user.userId;
    return this.tthService.create(createTthDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const { sub: userId, role } = req.user;
    return this.tthService.findAll(userId, role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const { sub: userId, role } = req.user;
    return this.tthService.findOne(id, userId, role);
  }

  @Get('number/:number')
  findNumber(@Param('number') number: string, @Request() req) {
    const { sub: userId, role } = req.user;
    return this.tthService.searchNumber(number, userId, role);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTthDto: TthUpdateDto,
    @Request() req,
  ) {
    const { sub: userId, role } = req.user;
    return this.tthService.update(id, updateTthDto, userId, role);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const { sub: userId, role } = req.user;
    return this.tthService.remove(id, userId, role);
  }
}
