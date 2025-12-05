import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseFiltersPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value.filters === 'string') {
      try {
        value.filters = JSON.parse(value.filters);
      } catch {
        console.log('error');
      }
    }
    return value;
  }
}
