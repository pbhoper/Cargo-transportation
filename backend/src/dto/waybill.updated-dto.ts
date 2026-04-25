import { IsOptional, IsString } from 'class-validator';


export class WaybillUpdatedDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  nameDriver?: string;

  @IsString()
  @IsOptional()
  vehicle?: string;

  @IsString()
  @IsOptional()
  fromCity?: string;

  @IsString()
  @IsOptional()
  toCity?: string;
}