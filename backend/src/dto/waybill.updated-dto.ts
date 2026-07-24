import {
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  Min,
} from 'class-validator';

export class WaybillUpdatedDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  @IsOptional()
  tthIds?: number[];
}
