import { Component, OnInit, Input, AfterViewInit, Renderer2 } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { IGame, states } from '../shared/game';
import * as $ from 'jquery';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit, AfterViewInit {
  @Input() game: IGame;
  $width: Number;
  isReady: Boolean = true;
  isDownloading: Boolean = false;
  isCompleted: Boolean = false;
  percentage: Number = 0;

  constructor(public _electronService: ElectronService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }
  getGame(event: MouseEvent, game: IGame) {
    if (this.isReady) {
      this.downloadGame(event, game);
    } else {
      if (this.isCompleted) {
        this.installGame(event, game);
      }
    }

  }

  downloadGame(event: MouseEvent, game: IGame) {
    // console.log(game);
    // this.isReady = false;
    // this.isDownloading = true;
      // $(this.$target).addClass('active');
      // $(this.$target).closest('.game-card').addClass('game-card--active');
      // $(this.$target).find('.progress-wrapper').addClass('active').clearQueue();
    setTimeout(() => {
    if (this._electronService.isElectronApp) {

      this._electronService.ipcRenderer.send('getGame', game.slug);
      game.state = states.isDownloading;
      console.log('Du er nu i gang med at downloade et spil (' + game.title + '), hurra!');
    }
    }, 600);

  }


  installGame(event: MouseEvent, game: IGame) {
    console.log('Installing ' + game.title);
  }
}
