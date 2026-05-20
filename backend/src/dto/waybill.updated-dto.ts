import { IsOptional, IsString } from 'class-validator';

export class WaybillUpdatedDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  ttn?: string;
}
