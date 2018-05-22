import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameService } from '../shared/game.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { IGame } from '../shared/game';
import * as $ from 'jquery';
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  providers: [GameService]
})

export class GameListComponent implements OnInit, AfterViewInit {
  filteredGames: IGame[];
  games: IGame[];

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredGames = this.listFilter ? this.performFilter(this.listFilter) : this.games;
  }

  constructor(_gameService: GameService) {
    this.games = _gameService.games;
    this.filteredGames = this.games;
    this.listFilter = '';

  }

  performFilter(filterBy: string): IGame[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.games.filter((game: IGame) => game.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // // #endregion
  }

  clear(event: MouseEvent) {
    $('.game-card').removeClass('game-card--active');
    $('.download').removeClass('active');
    $('.download-btn').removeClass('active finished');
    $('.progress-wrapper').removeClass('active');
    $('.progress__text').removeClass('completed').clearQueue();
    $('.success').removeClass('active');
    $('.progress-wrapper').css({ '--sPercentage': '"' + 0 + '%"', '--iPercentage': 0 + '' });
  }
}
