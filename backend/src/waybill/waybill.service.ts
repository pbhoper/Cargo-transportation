import { Injectable, NotFoundException } from '@nestjs/common';
import { WaybillUpdatedDto } from '../dto/waybill.updated-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WaybillEntity } from '../entity/waybill.entity';
import { Repository } from 'typeorm';
import { TthEntity } from '../entity/tth.entity';
import { WaybillDto } from '../dto/waybill-dto';

@Injectable()
export class WaybillService {
  constructor(
    @InjectRepository(WaybillEntity)
    private readonly repo: Repository<WaybillEntity>,
    @InjectRepository(TthEntity)
    private readonly tthRepo: Repository<TthEntity>,
  ) {}

  async create(dto: WaybillDto, req: any) {
    const userId = req.user.sub;
    const entity = this.repo.create({ title: dto.title, userId, tths: [] });

    const tths = await this.tthRepo.find({
      where: dto.tthIds.map((id) => ({ id })),
    });
    entity.tths = tths;

    return this.repo.save(entity);
  }

  async findAll(req: any) {
    const userId = req.user.sub;
    return this.repo.find({
      where: { userId },
      relations: ['tths'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number, req: any) {
    const userId = req.user.sub;
    const item = await this.repo.findOne({
      where: { id, userId },
      relations: ['tths'],
    });

    if (!item) throw new NotFoundException(`Waybill ${id} not found`);

    return item;
  }

  async update(id: number, dto: WaybillUpdatedDto, req: any) {
    const userId = req.user.sub;
    const item = await this.repo.findOne({ where: { id, userId } });

    if (!item) throw new NotFoundException(`Waybill ${id} not found`);

    if (dto.title !== undefined) {
      item.title = dto.title;
    }

    if (dto.tthIds !== undefined) {
      const tths = await this.tthRepo.find({
        where: dto.tthIds.map((id) => ({ id })),
      });
      item.tths = tths;
    }

    return this.repo.save(item);
  }

  async remove(id: number, req: any) {
    const userId = req.user.sub;
    const item = await this.repo.findOne({ where: { id, userId } });

    if (!item) throw new NotFoundException(`Waybill ${id} not found`);

    return this.repo.delete(id);
  }
}
