import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { GameService } from '../../games/shared/game.service';
import { states } from '../../games/shared/game';

@Component({
  selector: 'app-gameview',
  templateUrl: './gameview.component.html',
  styleUrls: ['./gameview.component.scss']
})
export class GameviewComponent implements  OnInit {
  games: any = [];
  modalOpen = false;
  constructor(public ref:ChangeDetectorRef, public _gameService:GameService,
    public _electronService: ElectronService) {
      this._gameService.games.subscribe(
        games => {
          this.games = games;
        }
      )

    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.on('stopDownloading', function (event, data) {
        const game = this.games.find(it => {
          return it.title.toLowerCase().includes(data.toLowerCase());
        });
        game.state = states.isCompleted;
        game.percentage;
        ref.detectChanges();
      });

      this._electronService.ipcRenderer.on('updateP', (event, data) => {
        const bla = this.games.find(it => {
          return it.title.toLowerCase().includes(data.name.toLowerCase());
        });
        bla.state = states.isDownloading;
        bla.percentage = data.procent;
        ref.detectChanges();
      });
    }
  }

  getGame(Game) {
    if (this._electronService.isElectronApp) {
      Game.isDownloading = true;
      this._electronService.ipcRenderer.send('getGame', Game.name);
      alert('Du er nu i gang med at downloade et spil (' + Game.name + '), hurra!');
    }
  }
  onSearchChange(searchValue: string) {
    const fn = this;
    searchValue = searchValue.toLowerCase();
  }

  ngOnInit() {
  }

}
