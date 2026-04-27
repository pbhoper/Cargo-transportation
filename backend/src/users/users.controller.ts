import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../enum/roles.enum';
import { CreateUserDto } from '../dto/users.create-dto';
import { UserEntity } from '../entity/users.entity';
import { UpdateUserDto } from '../dto/users.updated-dto';


@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
 constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Admin, Role.SysAdmin)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity[]> {
  return this.usersService.create(createUserDto);
  }

  @Get()
   async findAll(@Query('clientId') clientId?:string,): Promise<UserEntity[]> {
      return this.usersService.findAll({ clientId });
  }


  @Get(':id')
 async findOne(@Param('id') id: any): Promise<UserEntity> {
  return this.usersService.findOne(id)
  }

  @Put(':id')
  @Roles(Role.Admin, Role.SysAdmin, Role.Manager)
 async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
  return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
 @Roles(Role.Admin, Role.SysAdmin)
 async remove(@Param('id') id: string): Promise<UserEntity> {
  return this.usersService.remove(id)
  }
}