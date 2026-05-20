import { IsNotEmpty, IsString } from 'class-validator';

export class WaybillDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  ttn: string;
}
