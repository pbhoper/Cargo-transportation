import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehousesEntity } from '../entity/warehouses.entity';
import { WarehouseDto } from '../dto/warehouses-dto';

interface PaginationQuery {
  page: number;
  limit: number;
}

interface PaginatedResult {
  data: WarehousesEntity[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export class WarehousesService {
  constructor(
    @InjectRepository(WarehousesEntity)
    private readonly warehouseRepository: Repository<WarehousesEntity>,
  ) {}

  async create(createWarehouseDto: WarehouseDto): Promise<WarehousesEntity> {
    const warehouse = this.warehouseRepository.create(createWarehouseDto);
    if (createWarehouseDto.isTrusted) {
      console.log(`true склад: ${createWarehouseDto.name}`); // logger
    }
    return this.warehouseRepository.save(warehouse);
  }

  async findAll(query: PaginationQuery): Promise<PaginatedResult> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.warehouseRepository.findAndCount({ skip, take: limit, order:
        { CreatedAt: 'DESC' },
    });

    return { data,
      meta: {
        total, page, limit, totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<WarehousesEntity> {
    const warehouse = await this.warehouseRepository.findOneBy({ id });
    if (!warehouse) {
      throw new NotFoundException(`Склад N${id} не найден`);
    }
    return warehouse;
  }

  async update(
    id: number,
    updateDto: Partial<WarehouseDto>,
  ): Promise<WarehousesEntity> {
    const warehouse = await this.findOne(id);
    if (warehouse.isTrusted && !updateDto.isTrusted) {
      throw new NotFoundException(`Склад с таким ${id} не найден`);
    }

    const updatedWarehouse = this.warehouseRepository.create({...warehouse, ...updateDto,});

    return this.warehouseRepository.save(updatedWarehouse);
  }

  async remove(id: number): Promise<void> {
    const warehouse = await this.warehouseRepository.findOne({ where: { id } });
    if (!warehouse) {
      throw new NotFoundException('Склад не найден или был снесён');
    }
    await this.warehouseRepository.softRemove(warehouse);
  }
}
