import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bikeFilter'
})

export class BikeFilterPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
     let filter = args[0].toLocaleLowerCase();
     return filter ? value.filter(bike=> bike.name.toLocaleLowerCase().indexOf(filter) != -1) : value;
  }
}
