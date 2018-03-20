import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  text = 'dota';
  constructor(public _gameService: GameService) {
    
  }


  ngOnInit() {
  }
}
