import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef, Renderer2 } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { IGame } from '../shared/game';
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

  i = 1; //  set your counter to 1
  constructor(public _electronService: ElectronService, private renderer: Renderer2,
    private ref: ChangeDetectorRef) {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.on('stopDownloading', (event, data) => {
        this.percentage = 100;
        this.isCompleted = true;

        // $(this.$target).find('.progress-wrapper').css({
        //   '--sPercentage': '"100%"',
        //   '--iPercentage': 100 + ''
        // });
        // $(this.$target).addClass('finished').clearQueue();
        // $(this.$target).removeClass('active');
        // $(this.$target).find('.progress__text').addClass('completed').clearQueue();

      console.log(this.game);
      });

      this._electronService.ipcRenderer.on('updateP', (event, data) => {
       // this.percentage = data.procent.toFixed(0);
        // $(this.$target).find('.progress-wrapper').css({
        //   '--sPercentage': '"' + data.procent.toFixed(0) + '%"',
        //   '--iPercentage': data.procent.toFixed(0) + ''
        // });
       // console.log(this.percentage);
      });
    }



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
      game.state = 1;
      console.log('Du er nu i gang med at downloade et spil (' + game.title + '), hurra!');
    }
    }, 600);

  }


  installGame(event: MouseEvent, game: IGame) {
    console.log('Installing ' + game.title);
    // alert(`You have started installing ${game.title}`);
  }
}
