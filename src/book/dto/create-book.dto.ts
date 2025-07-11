import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  price: number;

  @IsString()
  genre: string;

  @IsNumber()
  publishedYear: number;

  @IsBoolean()
  inStock: boolean;
} 