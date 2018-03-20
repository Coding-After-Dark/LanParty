import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { GameService } from '../services/game.service';
import { ElectronService } from 'ngx-electron';
@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss']
})
export class ForsideComponent implements OnInit {
  title: any;
  connection;
  test;
  procent = 'Yo';

  constructor(_connectionService: ConnectionService, public _gameService: GameService, private _electronService: ElectronService
    , private ref: ChangeDetectorRef) {
    this.title = _connectionService.serverIP;

    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.on('stopDownloading', function (event, data) {
        let bla = _gameService.games.find(it => {
          return it.name.toLowerCase().includes(data.toLowerCase());
        });
        bla.isDownloading = false;
        bla.procent = "installed";
        ref.detectChanges();
      });

      this._electronService.ipcRenderer.on('updateP', (event, data) => {
        let bla = _gameService.games.find(it => {
          return it.name.toLowerCase().includes(data.name.toLowerCase());
        });
        bla.isDownloading = false;
        bla.procent = data.procent + "%";
        ref.detectChanges();
        console.log(bla);
      });
    }

  }

  ngOnInit() {
  }
  getGame(Game) {
    if (this._electronService.isElectronApp) {
      Game.isDownloading = true;
      this._electronService.ipcRenderer.send('getGame', Game.name);
      alert('Du er nu i gang med at downloade et spil (' + Game.name + '), hurra!');
    }
  }
  uploadGame() {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('selectGame');
    }
  }
}
