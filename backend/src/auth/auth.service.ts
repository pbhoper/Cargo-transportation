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
    const tokenBytes = crypto.randomBytes(32);
    const token = tokenBytes.toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const user = this.clientRepository.create({
      ...authDto,
      password: hashedPassword,
      roles: 'user',
      isVerified: false,
      verificationToken: tokenHash,
      verificationTokenAt: expiresAt,
    });

    const savedUser = await this.clientRepository.save(user);

    const verificationLink = `http://localhost/verify-email?token=${token}`;

    console.log(verificationLink);

    return savedUser;
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

    return this.generateToken(user);
  }

  async verifyEmail(token: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.clientRepository.findOne({
      where: { verificationToken: tokenHash },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный токен верификации');
    }

    if (!user.verificationTokenAt || user.verificationTokenAt < new Date()) {
      user.verificationToken = null;
      user.verificationTokenAt = null;
      await this.clientRepository.save(user);
      throw new UnauthorizedException('Срок действия токена верификации истёк');
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenAt = null;

    const savedUser = await this.clientRepository.save(user);
    const { token: newJwtToken } = await this.generateToken(savedUser);

    return {
      success: true,
      message: 'Email успешно подтвержден',
      token: newJwtToken,
    };
  }

  private async generateToken(user: AuthEntity) {
    const payload = {
      username: user.username,
      id: user.id,
      roles: user.roles,
      isVerified: user.isVerified,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async searchUsers(search: string) {
    if (!search) {
      return [];
    }
    return this.clientRepository
      .createQueryBuilder('client')
      .where('client.username LIKE :search', { search: `%${search}%` })
      .orWhere('client.firstName LIKE :search', { search: `%${search}%` })
      .orWhere('client.lastName LIKE :search', { search: `%${search}%` })
      .getMany();
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

    return this.clientRepository.save(user);
  }

  async changeUserRole(id: number, role: 'user' | 'admin') {
    const user = await this.clientRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    user.roles = role;
    return this.clientRepository.save(user);
  }
}
