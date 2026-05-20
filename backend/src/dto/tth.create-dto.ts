import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TthItemDto } from './tth.item-dto';
import { TthEnum } from '../enum/tth.enum';

export class CreateTthDto {
  // ❌ FIX: id не должен приходить от клиента
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @IsOptional()
  number?: string;

  @IsDateString()
  dateCreated: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  senderName: string;

  @IsString()
  senderId: string;

  @IsString()
  @IsOptional()
  senderAddress?: string;

  @IsOptional()
  senderType?: TthEnum;

  @IsString()
  recipientId: string;

  @IsString()
  recipientName: string;

  @IsString()
  @IsOptional()
  recipientAddress?: string;

  @IsOptional()
  recipientType?: TthEnum;

  @IsString()
  vehicleId: string;

  @IsString()
  vehicleBrandModel: string;

  @IsString()
  vehicleLicensePlate: string;

  @IsOptional()
  vehicleType?: TthEnum;

  @IsString()
  driverId: string;

  @IsString()
  driverFullName: string;

  @IsString()
  driverPassport: string;

  @IsOptional()
  driverPhone?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TthItemDto)
  items: TthItemDto[];
}
