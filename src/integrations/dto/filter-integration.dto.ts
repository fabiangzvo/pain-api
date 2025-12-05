import {
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  Min,
  Max,
  IsIn,
  IsNotEmpty,
  IsBoolean,
  IsObject,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FindOptionsWhere } from 'typeorm';

export class IntegrationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @IsBoolean()
  enabled: boolean;

  @IsBoolean()
  softRemoved: boolean;

  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;

  @IsUUID()
  userId: string;

  @IsUUID()
  statusId: string;

  @IsUUID()
  providerId: string;
}

export class PaginationQueryDto<T> {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Object)
  filters?: FindOptionsWhere<T>;
}
