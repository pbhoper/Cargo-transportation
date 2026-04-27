import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import {TthItemDto} from './tth.item-dto';
import { TthEnum } from '../enum/tth.enum';

export type TthStatus =
  'Completed'
  | 'Verification completed'
  | 'Delivered';


export class CreateTthDto {
  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  number?: string;

  @IsDateString()
  @IsNotEmpty()
  dateCreated: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsNotEmpty()
  senderName: string;

  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsString()
  @IsOptional()
  senderAddress?: string;

  @IsString()
  @IsOptional()
  senderType?: TthEnum.Client | TthEnum.Company;

  @IsString()
  recipientId: string;

  @IsString()
  recipientName: string;

  @IsString()
  @IsOptional()
  recipientAddress?: string;

  @IsString()
  @IsOptional()
  recipientType?: TthEnum.Warehouse | TthEnum.Shop;

  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @IsString()
  @IsNotEmpty()
  vehicleBrandModel: string;

  @IsString()
  @IsNotEmpty()
  vehicleLicensePlate: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  vehicleType?: TthEnum.Trailer | TthEnum.Refrigerator | TthEnum.Tank;

  @IsString()
  @IsNotEmpty()
  driverId: string;

  @IsString()
  @IsNotEmpty()
  driverFullName: string;

  @IsString()
  @IsNotEmpty()
  driverPassport: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  driverPhone?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TthItemDto)
  items: TthItemDto[];
}