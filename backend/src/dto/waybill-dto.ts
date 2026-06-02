import { IsNotEmpty, IsString, IsArray, IsNumber, Min } from 'class-validator';

export class WaybillDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  tthIds: number[];
}
