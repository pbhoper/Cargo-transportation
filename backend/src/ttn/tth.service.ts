import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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
    const newTth = this.tthRepository.create({ ...createTthDto, userId });
    return this.tthRepository.save(newTth);
  }

  async findAll(userId: number, role: string): Promise<TthEntity[]> {
    if (role === 'admin') {
      return this.tthRepository.find();
    }
    return this.tthRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: number, role: string): Promise<TthEntity> {
    const tth =
      role === 'admin'
        ? await this.tthRepository.findOne({ where: { id } })
        : await this.tthRepository.findOne({ where: { id, userId } });

    if (!tth) {
      throw new NotFoundException('Нет доступа');
    }
    return tth;
  }

  async searchNumber(
    number: string,
    userId: number,
    role: string,
  ): Promise<TthEntity[]> {
    if (role === 'admin') {
      return this.tthRepository.find({ where: { number } });
    }
    return this.tthRepository.find({ where: { number, userId } });
  }

  async update(
    id: number,
    updateTthDto: TthUpdateDto,
    userId: number,
    role: string,
  ): Promise<TthEntity> {
    const tth = await this.findOne(id, userId, role);

    if (role !== 'admin' && tth.userId !== userId) {
      throw new ForbiddenException('Нет доступа');
    }
    await this.tthRepository.update(id, updateTthDto);
    return this.findOne(id, userId, role);
  }

  async remove(id: number, userId: number, role: string): Promise<void> {
    const tth = await this.findOne(id, userId, role);
    if (role !== 'admin' && tth.userId !== userId) {
      throw new ForbiddenException('Нет доступа');
    }
    await this.tthRepository.softRemove(tth);
  }
}
