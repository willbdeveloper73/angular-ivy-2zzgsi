import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 25): any {
    return value && value.length > limit
      ? value.substr(0, limit) + '...'
      : value;
  }
}
