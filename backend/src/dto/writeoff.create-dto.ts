import { IsDate, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WriteoffCreateDto {
  @ApiProperty({ description: 'ID товара, который списан' })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'Количество списанного товара',
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Дата списания (по умолчанию — текущая)',
    required: false,
  })
  @IsOptional()
  @IsDate()
  date?: Date;
}
