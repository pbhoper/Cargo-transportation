import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsEntity } from '../entity/goods.entity';
import { GoodsDto} from '../dto/goods-dto';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
  ) {}

  async create(createGoodsDto: GoodsDto): Promise<GoodsEntity> {
    const good = this.goodsRepository.create(createGoodsDto);
    return this.goodsRepository.save(good);
  }

  async findAll(): Promise<GoodsEntity[]> {
    return this.goodsRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<GoodsEntity> {
    const good = await this.goodsRepository.findOne({ where: { id } });
    if (!good) throw new NotFoundException(`Товар N${id} не найден`);
    return good;
  }
  async update(
    id: number,
    updateGoodsDto: Partial<GoodsDto>,
  ): Promise<GoodsEntity> {
    const goods = await this.findOne(id);
    if (!goods) {
      throw new NotFoundException(`товар с N${id} не найден`);
    }
    return this.goodsRepository.save(
      this.goodsRepository.merge(goods, updateGoodsDto),
    );
  }
  async remove(id: number): Promise<void> {
    const good = await this.findOne(id);
    await this.goodsRepository.remove(good);
  }
}