import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-localstorage';

@Injectable()
export class TurnamentService {
  TurnamentKey: any;
  TurnamentUrl: any;
  constructor(public storage: LocalStorageService) {
    const bla = storage.get('turnament');
    if (bla) {
      this.TurnamentKey = bla;
      this.TurnamentUrl = bla;

    }

    console.log(bla);
   }

}
