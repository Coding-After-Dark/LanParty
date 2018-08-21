import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TurnamentService } from '../services/turnament.service';
import {LocalStorageService} from 'ngx-localstorage';
@Component({
  selector: 'app-turnament',
  templateUrl: './turnament.component.html',
  styleUrls: ['./turnament.component.scss']
})
export class TurnamentComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer, public _turnament: TurnamentService, public storage: LocalStorageService) {

  // Get turnament key from localstorage

  }

  ngOnInit() {
  }
  SetTurnamentKey(Key) {
    console.log(Key);
    const Url = 'http://challonge.com/' + Key +  '/module';
    this._turnament.TurnamentUrl = Url;
    this._turnament.TurnamentKey = Key;
    this.storage.set('turnament', this._turnament.TurnamentUrl);
  }
  RemoveTurnamentKey() {
    this.storage.remove('turnament');
    this._turnament.TurnamentKey = undefined;
    // remove turnamentkey from localstorage
  }
}
