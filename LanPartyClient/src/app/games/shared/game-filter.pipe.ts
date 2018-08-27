import { Pipe, PipeTransform } from '@angular/core';
import { IGame } from './game';

@Pipe({
  name: 'gameFilter',
  pure: false

})
export class GameFilterPipe implements PipeTransform {

  transform(Games: IGame[], searchString): any {
    console.log(searchString);
    if (searchString !== undefined) {
      if (searchString.length > 0) {
        return Games.filter(p => p.title.toLowerCase().includes(searchString.toLowerCase()));
      }
    }
    return Games;
  }
}
