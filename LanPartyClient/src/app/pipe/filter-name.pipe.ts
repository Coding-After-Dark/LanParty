import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
