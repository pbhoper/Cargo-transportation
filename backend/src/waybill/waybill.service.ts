import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaybillEntity } from '../entity/waybill.entity';
import { WaybillDto} from '../dto/waybill-dto';
import { WaybillUpdatedDto } from '../dto/waybill.updated-dto';

@Injectable()
export class WaybillService {
  constructor(
    @InjectRepository(WaybillEntity)
    private readonly repo: Repository<WaybillEntity>,
  ) {}

  create(dto: WaybillDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException(`Waybill ${id} not found`);
    return item;
  }

  async update(id: number, dto: WaybillUpdatedDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
