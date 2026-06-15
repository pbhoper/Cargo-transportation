import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dto/register-dto';
import { LoginDto } from '../dto/login-dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('users/search')
  searchUsers(@Query('search') search: string) {
    return this.authService.searchUsers(search);
  }

  @Patch('users/:id/role')
  @UseGuards(JwtAuthGuard)
  changeUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: 'user' | 'admin',
    @Request() req,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Только админ может менять роли');
    }
    return this.authService.changeUserRole(id, role);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Request() req) {
    return req.user;
  }
}
