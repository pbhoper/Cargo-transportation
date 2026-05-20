import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class WarehouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  house: string;

  @IsOptional()
  @IsString()
  apartment?: string;

  @IsBoolean()
  isTrusted: boolean;
}
