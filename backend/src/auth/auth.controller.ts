import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth-dto';

@Controller('auth')
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
