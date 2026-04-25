import { IsNumber, IsString, IsOptional, IsDate, Min } from 'class-validator';

export class UpdateWriteOffDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pricePerUnit?: number;

  @IsOptional()
  @IsString()
  responsiblePerson?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  comment?: string;
}
