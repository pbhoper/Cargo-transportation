import {
  IsString,
  IsOptional,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './users.create-dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Пароль (если нужно сменить)',
    example: 'новый пароль',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(4)
  password: string;
}
