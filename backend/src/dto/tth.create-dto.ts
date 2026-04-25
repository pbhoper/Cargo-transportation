import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import {TthItemDto} from './tth.item-dto';

export type TthStatus =
  'Completed'
  | 'Verification completed'
  | 'Delivered';


export class CreateTthDto {
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

  @IsString()
  @IsOptional()
  senderType?: 'Client' | 'Company';

  @IsString()
  recipientId: string;

  @IsString()
  recipientName: string;

  @IsString()
  @IsOptional()
  recipientAddress?: string;

  @IsString()
  @IsOptional()
  recipientType?: 'Warehouse' | 'Shop';

  @IsString()
  vehicleId: string;

  @IsString()
  vehicleBrandModel: string;

  @IsString()
  vehicleLicensePlate: string;

  @IsString()
  @IsOptional()
  vehicleType?: 'Trailer' | 'Refrigerator' | 'Tank';

  @IsString()
  driverId: string;

  @IsString()
  driverFullName: string;

  @IsString()
  driverPassport: string;

  @IsString()
  @IsOptional()
  driverPhone?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TthItemDto)
  items: TthItemDto[];
}