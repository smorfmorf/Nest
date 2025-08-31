import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StartWith } from '../decorator';

export class CreateDto {
  @IsString({ message: 'Поле title строка!' })
  @IsNotEmpty()
  @StartWith('Task', { message: 'Название должно начинаться c Task' })
  title: string;

  @IsArray()
  @IsString({ each: true, message: 'Поле tags строка!' })
  @IsOptional()
  tags: string[];
}

export class UpdateDto {
  title: string;
  status: string;
}
