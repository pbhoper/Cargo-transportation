import { IsDateString,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';


export class ReportDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
