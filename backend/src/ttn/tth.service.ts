import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TthEntity } from '../entity/tth.entity';
import { CreateTthDto } from '../dto/tth.create-dto';
import { TthUpdateDto } from '../dto/tth.update-dto';

@Injectable()
export class TthService {
  constructor(
    @InjectRepository(TthEntity)
    private readonly tthRepository: Repository<TthEntity>,
  ) {}

  async create(createTthDto: CreateTthDto): Promise<TthEntity> {
    const newTth = this.tthRepository.create(createTthDto);
    return await this.tthRepository.save(newTth);
  }

  async findAll(): Promise<TthEntity[]> {
    return await this.tthRepository.find();
  }

  async findOne(id: number): Promise<TthEntity> {
    const tth = await this.tthRepository.findOne({ where: { id } });
    if (!tth) {
      throw new NotFoundException(`ТТН с ID ${id} не найдена`);
    }
    return tth;
  }

  async searchNumber(tthNumber: number): Promise<TthEntity[]> {
    return await this.tthRepository.find({
      where: { number: String(tthNumber) },
    });
  }

  async update(id: number, updateTthDto: TthUpdateDto): Promise<TthEntity> {
    const tth = await this.findOne(id);

    const UpdateTth =  this.tthRepository.create({...tth, ...updateTthDto});
    return await this.tthRepository.save(UpdateTth);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tthRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('ТТН не найден или был удален');
    }
    await this.tthRepository.softRemove(result);
  }
}