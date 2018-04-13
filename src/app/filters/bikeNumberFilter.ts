import { Pipe, PipeTransform } from '@angular/core';
import {Bike} from '../dbmodels/bike';

@Pipe({
  name: 'bikeNumberFilter',
  pure: false
})

export class BikeNumberFilter implements PipeTransform {
  transform(items: any[], num: string): any[] {
    if(!items) return [];
    if(!num) return items;
return items.filter( it => {
      return it.number.toString().includes(num);
    });
   }
}
