import { IsNotEmpty, IsString } from 'class-validator';


export class WaybillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nameDriver: string;

  @IsString()
  @IsNotEmpty()
  vehicle: string;

  @IsString()
  @IsNotEmpty()
  fromCity: string;

  @IsString()
  @IsNotEmpty()
  toCity: string;
}