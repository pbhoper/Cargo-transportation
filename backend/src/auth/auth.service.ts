import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from '../entity/auth.entity';
import { AuthDto } from '../dto/auth-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private clientRepository: Repository<AuthEntity>,) {}

  async createClient(authDto: AuthDto, role: string,): Promise<AuthEntity> {

    if (role !== 'sysadmin') {
      throw new ForbiddenException(
        'Только СисАдмин может производить регистрацию',
      );
    }

    const entityData: Partial<AuthEntity> = plainToInstance(AuthEntity, authDto,);

    return this.clientRepository.save(entityData);
  }

  async findAllClients(): Promise<AuthEntity[]> {
    return this.clientRepository.find();
  }
}
