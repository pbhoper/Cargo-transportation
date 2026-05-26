import { Injectable, ForbiddenException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from '../entity/auth.entity';
import { RegisterDto } from '../dto/register-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private clientRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async register(authDto: RegisterDto) {
    const candidate = await this.clientRepository.findOne({
      where: {
        email: authDto.email,
      },
    });

    if (candidate) {
      throw new ForbiddenException('Пользователь уже существует');
    }

    const hashedPassword = await bcrypt.hash(authDto.password, 5);

    const user = this.clientRepository.create({
      ...authDto,
      password: hashedPassword,
    });

    return this.clientRepository.save(user);
  }

  async login(authDto: LoginDto) {
    const user = await this.clientRepository.findOne({
      where: {
        username: authDto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный логин');
    }

    const passwordEquals = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (!passwordEquals) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
