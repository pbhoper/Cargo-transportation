import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaybillEntity } from '../entity/waybill.entity';
import { WaybillDto } from '../dto/waybill-dto';
import { WaybillUpdatedDto } from '../dto/waybill.updated-dto';
import { TthEntity } from '../entity/tth.entity';

@Injectable()
export class WaybillService {
  constructor(
    @InjectRepository(WaybillEntity)
    private readonly repo: Repository<WaybillEntity>,
    @InjectRepository(TthEntity)
    private readonly tthRepo: Repository<TthEntity>,
  ) {}

  async create(dto: WaybillDto) {
    const entity = this.repo.create({ title: dto.title, tths: [],});

    const tths = await this.tthRepo.find({ where: dto.tthIds.map((id) => ({ id })), });entity.tths = tths;

    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find({ relations: ['tths'], order: { id: 'DESC' }, });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id }, relations: ['tths'], });

    if (!item) throw new NotFoundException(`Waybill ${id} not found`);

    return item;
  }

  async update(id: number, dto: WaybillUpdatedDto) {
    const item = await this.findOne(id);

    if (dto.title !== undefined) {
      item.title = dto.title;
    }

    if (dto.tthIds !== undefined) {
      const tths = await this.tthRepo.find({ where: dto.tthIds.map((id) => ({ id })), });

      item.tths = tths;
    }

    return this.repo.save(item);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
