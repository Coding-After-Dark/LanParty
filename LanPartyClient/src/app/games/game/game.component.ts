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
  i = 1; //  set your counter to 1
  constructor(public _electronService: ElectronService,
    private ref: ChangeDetectorRef) {
      if (this._electronService.isElectronApp) {
        this._electronService.ipcRenderer.on('stopDownloading', function (event, data) {
          // $(target).addClass('finished').clearQueue();
          // $(target).removeClass('active');
          // $(target).find('.progress__text').addClass('completed').clearQueue();
          this.isCompleted = true;
          console.log(data);
        });

        this._electronService.ipcRenderer.on('updateP', (event, data) => {
          // $(target).find('.progress-wrapper').css({
          //   '--sPercentage': '"' + data.procent + '%"',
          //   '--iPercentage': data.procent + ''
          // });
          console.log(event);
        });
      }



    }

  ngOnInit() {
  }

  ngAfterViewInit() {

 }

getGame(event: MouseEvent, game: IGame) {
  if (this._electronService.isElectronApp) {
    this.isDownloading = true;
    this._electronService.ipcRenderer.send('getGame', game.id + '.rar');
    console.log('Du er nu i gang med at downloade et spil (' + game.title + '), hurra!');
  }

  if (this.isReady) {
    this.downloadGame(event, game);
  } else {
    if (this.isCompleted) {
      this.installGame(event, game);
    }
  }

}

 downloadGame(event: MouseEvent, game: IGame) {
   const $this = event.currentTarget;
   this.isReady = false;
    $($this).addClass('active');
    $($this).closest('.game-card').addClass('game-card--active');
    $($this).find('.progress-wrapper').addClass('active').clearQueue();
  }


  myLoop (target) {
    //  create a loop function

      //  call a 3s setTimeout when the loop is called
      if (this.i <= 100) {
        this.i++; //  increment the counter


        this.myLoop(target);
      } else {


      }

  }
  installGame(event: MouseEvent, game: IGame) {
     console.log('Installing ' + game.title);
    // alert(`You have started installing ${game.title}`);
  }
}
