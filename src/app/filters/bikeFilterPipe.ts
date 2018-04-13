import { Pipe, PipeTransform } from '@angular/core';
import {Bike} from '../dbmodels/bike';

@Pipe({
  name: 'bikeFilter',
  pure: false
})

export class BikeFilterPipe implements PipeTransform {
  transform(items: any[], term): any {
      console.log('term', term);

      return term
          ? items.filter(item => item.name.toLocaleLowerCase().indexOf(term) !== -1)
          : items;
  }
}
