import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIntegrationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  providerId: string;
}
