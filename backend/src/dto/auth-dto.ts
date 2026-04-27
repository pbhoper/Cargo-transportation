import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  status?: string;
}
