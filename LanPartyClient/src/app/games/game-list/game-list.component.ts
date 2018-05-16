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
      this.games = [
        {
          id: 133,
          title: 'Warcraft III: The Frozen Throne',
          genre: 'Rts',
          description: 'Real-time strategy game in a fantasy setting.',
          imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/warkeyigiyyknusmfev2.jpg',
          playerCount: 10
        },
        {
          id: 124,
          title: 'Left 4 Dead 2',
          genre: 'Fps',
          // tslint:disable-next-line:max-line-length
          description: 'Left 4 Dead 2 is a 2-4 player co-op first person shooter that requires tons of cooperation and intense zombie slaughtering in order to survive.There is a variety of enemies, weapons, and objectives to keep things interesting, with co-op that is focused around having fun playing with your friends.',
          imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/eckumjvspgvgsap4wmp2.jpg',
          playerCount: 4
        },
        {
          id: 2963,
          title: 'Dota 2',
          genre: 'Rts',
          // tslint:disable-next-line:max-line-length
          description: 'Dota 2 is a multiplayer online battle arena video game and the stand-alone sequel to the Defense of the Ancients (DotA) mod. Each match of Dota 2 involves two teams, both containing five players and occupying a fortified stronghold at either end of the map. Victory is achieved by destroying the enemys Ancient, a building that is invulnerable until certain objectives are achieved. Each player controls a "Hero" character and focuses on leveling up, acquiring items and fighting against the other team to achieve victory during each match.',
          imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/qcx7vedma0pvf0hzisxc.jpg',
          playerCount: 5
        },
        {
          id: 11198,
          title: 'Rocket League',
          genre: 'Sports',
          // tslint:disable-next-line:max-line-length
          description: 'Rocket League is a third-person, physics based soccer game, where players control rocket powered cars in order to hit the ball towards a goal. Basically, a car based soccer/football game.',
          imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover_qhhlj6.jpg',
          playerCount: 3
        },
        {
          id: 891,
          title: 'Team Fortress 2',
          genre: 'Fps',
          // tslint:disable-next-line:max-line-length
          description: 'Team Fortress 2 is a multi-platform, first-person shooter, multiplayer game that focuses on team based gameplay, where each player has their own unique role on the team.',
          imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/ijp2rheve0eccuhtanli.jpg',
          playerCount: 4
        },
        {
          id: 888,
          title: 'Supreme Commander: Forged Alliance',
          genre: 'Rts',
          description: 'Supreme Commander is a real time strategy game set in a fictional sci-fi universe.',
          imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/x2gbk38zhbhxhs2omgsr.jpg',
          playerCount: 7
        },
      ];
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
