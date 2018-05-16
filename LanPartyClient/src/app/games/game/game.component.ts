import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  $target;
  i = 1; //  set your counter to 1
  constructor(public _electronService: ElectronService,
    private ref: ChangeDetectorRef) {
      if (this._electronService.isElectronApp) {
        const $this = this;
        this._electronService.ipcRenderer.on('stopDownloading', function (event, data) {
          $($this.$target).addClass('finished').clearQueue();
          $($this.$target).removeClass('active');
          $($this.$target).find('.progress__text').addClass('completed').clearQueue();
          $this.isCompleted = true;
          console.log(data);
        });

        this._electronService.ipcRenderer.on('updateP', (event, data) => {
          $($this.$target).find('.progress-wrapper').css({
            '--sPercentage': '"' + data.procent + '%"',
            '--iPercentage': data.procent + ''
          });
          console.log(event);
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
   this.$target = event.currentTarget;
   this.isReady = false;
    $(this.$target).addClass('active');
    $(this.$target).closest('.game-card').addClass('game-card--active');
    $(this.$target).find('.progress-wrapper').addClass('active').clearQueue();
    if (this._electronService.isElectronApp) {
      this.isDownloading = true;
      this._electronService.ipcRenderer.send('getGame', game.id + '.rar');
      console.log('Du er nu i gang med at downloade et spil (' + game.title + '), hurra!');
    }
  }
  installGame(event: MouseEvent, game: IGame) {
     console.log('Installing ' + game.title);
    // alert(`You have started installing ${game.title}`);
  }
}
