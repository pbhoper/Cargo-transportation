import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entity/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/users.create-dto';
import { Role } from '../enum/roles.enum';
import { UpdateUserDto } from '../dto/users.updated-dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, clientId, roleKeys, ...userData } = createUserDto;

    if (!roleKeys || roleKeys.length === 0) {
      throw new NotFoundException(
        'Пользователь должен иметь минимум одну роль',
      );
    }

    for (const key of roleKeys) {
      if (!Object.values(userData).includes(key as Role)) {
        throw new NotFoundException(`Недействительная ключ роли: ${key}`);
      }
    }

    const birthDate = userData.birthDate
      ? userData.birthDate.toISOString().split('T')[0]
      : null;

    delete userData.birthDate;

    const user = this.usersRepository.create({
      ...userData,
      birthDate,
      passwordHash: await bcrypt.hash(password, SALT_ROUNDS),
      clientId: '...',
      isActive: true,
    });

    await this.usersRepository.save(user);

    return await this.usersRepository.save(user);
  }

  async findAll(filters?: { clientId?: string }): Promise<UserEntity[]> {
    const request = this.usersRepository.createQueryBuilder('user');

    if (!filters?.clientId) {
      (request.andWhere('user.clientId = ;clientId'),
        { clientId: filters?.clientId });
    }

    return request.getMany();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с таким id ${id} не найден`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);

      const { password, clientId, ...updateData } = updateUserDto;

    Object.assign(user, updateData);

    if (password) {
      user.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    }

    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);

    await this.usersRepository.remove(user);

    return user;
  }
}