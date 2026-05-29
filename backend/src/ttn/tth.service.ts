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

  async create(createTthDto: CreateTthDto, userId: number): Promise<TthEntity> {
    console.log('CreateTthDto:', JSON.stringify(createTthDto, null, 2));
    console.log('userId:', userId);

    const newTth = this.tthRepository.create({
      ...createTthDto,
      userId,
    });
    return await this.tthRepository.save(newTth);
  }

  async findAll(userId: number): Promise<TthEntity[]> {
    return await this.tthRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<TthEntity> {
    const tth = await this.tthRepository.findOne({
      where: { id, userId },
    });
    if (!tth) {
      throw new NotFoundException(
        `ТТН с ID ${id} не найдена или не принадлежит вам`,
      );
    }
    return tth;
  }

  async searchNumber(number: string, userId: number): Promise<TthEntity[]> {
    return await this.tthRepository.find({
      where: { number, userId },
    });
  }

  async update(
    id: number,
    updateTthDto: TthUpdateDto,
    userId: number,
  ): Promise<TthEntity> {
    await this.findOne(id, userId);
    await this.tthRepository.update(id, updateTthDto);
    return this.findOne(id, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    const tth = await this.findOne(id, userId);
    await this.tthRepository.softRemove(tth);
  }
}
