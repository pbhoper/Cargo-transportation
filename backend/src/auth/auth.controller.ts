import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth-dto';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { Role } from '../enum/roles.enum';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly sysAdminService: AuthService) {}

  @Post()
  // @Roles(Role.SysAdmin)
  create(@Body() createClientDto: AuthDto) {
    return this.sysAdminService.createClient(createClientDto, Role.SysAdmin);
  }

  @Post('register')
  register(@Body() registerClientDto: AuthDto) {
    console.log('register', registerClientDto);
  }

  @Post('login')
  login(@Body() loginClientDto: AuthDto) {
    console.log('login', loginClientDto);
  }

  @Get()
  @Roles(Role.SysAdmin)
  findAll() {
    return this.sysAdminService.findAllClients();
  }
}
