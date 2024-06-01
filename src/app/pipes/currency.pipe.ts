import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mycurrency',
  standalone: true
})
export class MyCurrencyPipe implements PipeTransform {

  /*transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }*/
  transform(value : number):string{
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD',maximumFractionDigits: 2 }) ;
  }

}
