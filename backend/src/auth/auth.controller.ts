import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dto/register-dto';
import { LoginDto } from '../dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly sysAdminService: AuthService) {}

  @Post('register')
  register(@Body() registerClientDto: RegisterDto) {
    return this.sysAdminService.register(registerClientDto);
  }

  @Post('login')
  login(@Body() loginClientDto: LoginDto) {
    return this.sysAdminService.login(loginClientDto);
  }
}
