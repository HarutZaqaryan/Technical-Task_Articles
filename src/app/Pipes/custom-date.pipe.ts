import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): any {
    const dayOfYear = (date: any) =>
      Math.floor((date - +new Date(date.getFullYear(), 0, 0)) / 86_400_000);

    return dayOfYear(new Date(value.slice(0, 10))) < 100
      ? value.slice(0, 4) + '/' + '0' + dayOfYear(new Date(value.slice(0, 10)))
      : value.slice(0, 4) + '/' + dayOfYear(new Date(value.slice(0, 10)));
  }
}
