import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDate, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя',
    example: 'Андрей' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Фамилия',
    example: 'Андреев' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Отчество',
    example: 'Андреевич',
    required: false,
  })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({
    description: 'Дата рождения',
    example: '1990-05-20',
    required: false,
  })
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    description: 'Email',
    example: 'asdf@asdf.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Город',
    example: 'Минск', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'Улица',
    example: 'Советская', required: false })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({
    description: 'Дом',
    example: '15', required: false })
  @IsString()
  @IsOptional()
  house?: string;

  @ApiProperty({
    description: 'Квартира',
    example: '23', required: false })
  @IsString()
  @IsOptional()
  apartment?: string;

  @ApiProperty({
    description: 'Login',
    example: 'andrey123.com' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'Пароль',
    example: 'sadf2134' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'ID клиента-перевозчика',
    example: 'asdf1234',
  })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    description: 'Ключи ролей',
    example: ['ADMIN', 'MANAGER'],
  })
  @IsString({ each: true })
  @IsNotEmpty()
  roleKeys: string[];
}