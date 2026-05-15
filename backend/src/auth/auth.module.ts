import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEntity } from '../entity/auth.entity';
import { Strategy } from 'passport-jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),

    JwtModule.register({
      secret: 'SUPER_SECRET',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, Strategy],
  exports: [AuthService],
})
export class AuthModule {}