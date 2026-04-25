import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WaybillEntity } from '../entity/waybill.entity';
import { Repository } from 'typeorm';
import {WaybillDto} from '../dto/waybill-dto';
import {WaybillUpdatedDto} from '../dto/waybill.updated-dto';


@Injectable()
export class WaybillService {
  constructor(
    @InjectRepository(WaybillEntity)
    private waybillRepository: Repository<WaybillEntity>,
  ) {}

  async create(WaybillDto: Partial<WaybillDto>): Promise<WaybillEntity> {
    const waybill = this.waybillRepository.create(WaybillDto);
    return await this.waybillRepository.save(waybill);
  }

  async findOne(id: number): Promise<WaybillEntity> {
    const waybill = await this.waybillRepository.findOneBy({ id });
    if (!waybill) {
      throw new NotFoundException(`Путевой лист с  N${id} не найден`);
    }
    return waybill;
  }

  async findAll(): Promise<WaybillEntity[]> {
    const waybills = await this.waybillRepository.find({
      order: { id: 'DESC' },
    });
    if (!waybills) {
      throw new NotFoundException(`Путевых листов еще нет`);
    }
    return waybills;
  }

  async update(id: number, updateWaybillDto: WaybillUpdatedDto,): Promise<WaybillEntity> {
    const waybill = await this.findOne(id);
    if (!waybill) {
      throw new NotFoundException(`Путевой лист с  N${id} не найден`);
    }
    const updated = this.waybillRepository.create(waybill);

    return await this.waybillRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const waybill = await this.waybillRepository.findOne({ where: { id } });
    if (!waybill) {
      throw new NotFoundException(`Путевой лист с N${id} не найден`);
    }
    await this.waybillRepository.delete(id);
  }
}