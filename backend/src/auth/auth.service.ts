import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from '../entity/auth.entity';
import { AuthDto } from '../dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private clientRepository: Repository<AuthEntity>,) {}

  async createClient(
    authDto: AuthDto, role: string,): Promise<AuthEntity> {

    if (role !== 'sysadmin') {
      throw new ForbiddenException(
        'Только СисАдмин может производить регистрацию',
      );
    }

    const client = this.clientRepository.create(authDto);
    return this.clientRepository.save(client);
  }

  async findAllClients(): Promise<AuthEntity[]> {
    return this.clientRepository.find();
  }
}
