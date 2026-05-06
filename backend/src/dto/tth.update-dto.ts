import { IsDateString, IsOptional, IsString } from 'class-validator';
import { TthEnum } from '../enum/tth.enum';


export class TthUpdateDto {
  @IsString()
  @IsOptional()
  number?: string;

  @IsDateString()
  @IsOptional()
  dateCreated?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  senderName?: string;

  @IsString()
  @IsOptional()
  senderId?: string;

  @IsString()
  @IsOptional()
  senderAddress?: string;

  @IsString()
  @IsOptional()
  senderType?: TthEnum

  @IsString()
  @IsOptional()
  recipientId?: string;

  @IsString()
  @IsOptional()
  recipientName?: string;

  @IsString()
  @IsOptional()
  recipientAddress?: string;

  @IsString()
  @IsOptional()
  recipientType?: TthEnum

  @IsString()
  @IsOptional()
  vehicleId?: string;

  @IsString()
  @IsOptional()
  vehicleBrandModel?: string;

  @IsString()
  @IsOptional()
  vehicleLicensePlate?: string;

  @IsString()
  @IsOptional()
  vehicleType?: TthEnum

  @IsString()
  @IsOptional()
  driverId?: string;

  @IsString()
  @IsOptional()
  driverFullName?: string;

  @IsString()
  @IsOptional()
  driverPassport?: string;

  @IsString()
  @IsOptional()
  driverPhone?: string;
}