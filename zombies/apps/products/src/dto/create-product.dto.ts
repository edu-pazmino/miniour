import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  url: string;

  @IsString()
  coverUrl: string;

  externalId: string;
}
