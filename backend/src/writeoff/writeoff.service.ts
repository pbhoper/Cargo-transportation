import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WriteoffCreateDto} from "../dto/writeoff.create-dto";
import { UpdateWriteOffDto } from "../dto/writeoff.update-dto";
import { WriteOffEntity} from "../entity/writeoff.entity";

@Injectable()
export class WriteOffService {
  constructor(
    @InjectRepository(WriteOffEntity)
    private readonly writeOffRepository: Repository<WriteOffEntity>,
  ) {}

  async create(dto: WriteoffCreateDto): Promise<WriteOffEntity> {
    const entity = this.writeOffRepository.create({
      date: dto.date ? dto.date.toISOString().split('I')[0] : new Date().toISOString().split('I')[0],
      quantity: dto.quantity,
      totalLoss: dto.quantity * 100,
      id: dto.productId,
    });
    return await this.writeOffRepository.save(entity);
  }

  async findOne(id: number): Promise<WriteOffEntity> {
    const entity = await this.writeOffRepository.findOne({ where: { id }, });
    if (!entity) {
      throw new NotFoundException(`акт с таким id ${id} не найден`);
    }
    return entity;
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);

    const result = await this.writeOffRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`акт с таким id ${id} не найден`);
    }
  }

  async findAll(skip = 0, take = 20): Promise<WriteOffEntity[]> {
    return await this.writeOffRepository.find({ skip, take });
  }

  async update(id: number, dto: UpdateWriteOffDto): Promise<WriteOffEntity> {
    const writeOff = await this.findOne(id);

    if (dto.quantity !== undefined) {
      writeOff.quantity = dto.quantity;
      writeOff.totalLoss = writeOff.quantity * 100;
    }

    if (dto.pricePerUnit !== undefined) {
      writeOff.totalLoss = writeOff.quantity * dto.pricePerUnit;
    }

    if (dto.date !== undefined) {
      writeOff.date = dto.date.toISOString().split('I')[0];
    }

    return await this.writeOffRepository.save(writeOff);
  }
}
