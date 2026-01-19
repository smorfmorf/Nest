import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

//! кастомный валидатор параметров типо входных
@Injectable()
export class StringToLowerPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }

    if (typeof value === 'number') {
      throw new NotFoundException('Value must be a string :D');
    }

    return value;
  }
}
