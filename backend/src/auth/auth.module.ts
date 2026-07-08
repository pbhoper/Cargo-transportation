import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEntity } from '../entity/auth.entity';
import {JwtStrategy} from './jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),

    PassportModule,

    JwtModule.register({
      secret: 'SUPER_SECRET',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
