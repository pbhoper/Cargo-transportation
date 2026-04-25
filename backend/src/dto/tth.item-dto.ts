import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString } from 'class-validator';

export type TtnItemStatus =
  | 'accepted'
  | 'Verification completed'
  | 'Delivered'
  | 'Lost';

export class TthItemDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum([])
  status: TtnItemStatus;
}