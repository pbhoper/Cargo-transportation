import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth-dto';
import { RolesGuard } from '../guard/roles.guard';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly sysAdminService: AuthService) {}

  @Post('register')
  register(@Body() registerClientDto: AuthDto) {
    return this.sysAdminService.register(registerClientDto);
  }

  @Post('login')
  login(@Body() loginClientDto: AuthDto) {
    return this.sysAdminService.login(loginClientDto);
  }
}
