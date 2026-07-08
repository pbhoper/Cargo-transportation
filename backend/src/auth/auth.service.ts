import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from '../entity/auth.entity';
import { RegisterDto } from '../dto/register-dto';
import { LoginDto } from '../dto/login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private clientRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async register(authDto: RegisterDto) {
    const candidate = await this.clientRepository.findOne({
      where: { email: authDto.email },
    });

    if (candidate) {
      throw new ForbiddenException('Пользователь уже существует');
    }

    const hashedPassword = await bcrypt.hash(authDto.password, 5);

    const user = this.clientRepository.create({
      ...authDto,
      password: hashedPassword,
      roles: 'user',
    });

    return this.clientRepository.save(user);
  }

  async login(authDto: LoginDto) {
    const user = await this.clientRepository.findOne({
      where: { username: authDto.username },
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
      sub: user.id,
      email: user.email,
      role: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async searchUsers(search?: string) {
    const query = this.clientRepository.createQueryBuilder('user');

    if (search && search.length >= 1) {
      query.where(
        'user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.username ILIKE :search',
        { search: `%${search}%` },
      );
    }

    query.take(10);

    return query.getMany();
  }

  async changeUserRole(id: number, role: 'user' | 'admin') {
    const user = await this.clientRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    user.roles = role;

    return this.clientRepository.save(user);
  }

  async requestPasswordReset(email: string) {
    const user = await this.clientRepository.findOne({
      where: { email },
    });

    if (!user) {

      throw new NotFoundException('Пользователь с этим email не найден');
    }

    const tokenBytes = crypto.randomBytes(32);
    const token = tokenBytes.toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date();

    expiresAt.setHours(expiresAt.getHours() + 1);
    user.resetToken = tokenHash;
    user.resetTokenAt = expiresAt;

    await this.clientRepository.save(user);

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    return { resetLink };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.clientRepository.findOne({
      where: {
        resetToken: tokenHash,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный токен восстановления');
    }

    if (!user.resetTokenAt || user.resetTokenAt < new Date()) {
      user.resetToken = null;
      user.resetTokenAt = null;
      await this.clientRepository.save(user);

      throw new UnauthorizedException('Токен восстановления истёк');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 5);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenAt = null;

    await this.clientRepository.save(user);

    return { success: true };
  }
}
