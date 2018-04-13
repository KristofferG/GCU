import { Pipe, PipeTransform } from '@angular/core';
import {Bike} from '../dbmodels/bike';

@Pipe({
  name: 'bikeFilter',
  pure: false
})

export class BikeFilterPipe implements PipeTransform {
  transform(items: any[], filter: Bike): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.name.indexOf(filter.name) !== -1);
  }
}
