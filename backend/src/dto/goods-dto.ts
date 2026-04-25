import {
  IsString,
  IsNumber,
  IsPositive,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { GoodsEnum } from '../enum/goods.enum';

export class GoodsDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsEnum(GoodsEnum)
  status?: GoodsEnum = GoodsEnum.accepted;
}
