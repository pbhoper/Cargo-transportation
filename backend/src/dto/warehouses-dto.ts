import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WarehouseDto {
  @ApiProperty({ description: 'склад1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  deletedAt: Date;

  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: 'Город, где находится склад' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Улица Пушкина' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: 'Дом калатушкина' })
  @IsString()
  @IsNotEmpty()
  house: string;

  @ApiProperty({ description: 'Квартира 123', required: false })
  @IsOptional()
  @IsString()
  apartment?: string;

  @ApiProperty({ description: 'Доверенный' })
  @IsBoolean()
  isTrusted: boolean;
}
