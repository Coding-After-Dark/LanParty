import { Component, OnInit , OnDestroy} from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { GameService } from '../services/game.service';
import {ElectronService} from 'ngx-electron';
@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss']
})
export class ForsideComponent implements OnInit {
  title: any;
  games: any = [];
  connection;
  test;
  constructor(_connectionService: ConnectionService, public _gameService: GameService, private _electronService: ElectronService) {
    this.title = _connectionService.serverIP;

   }

  ngOnInit() {
    this.connection = this._gameService.getGames().subscribe(message => {
      this.games = message;
      this.test = this._gameService.getGames();
    });
  }
  getGame(GameName) {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('getGame', GameName);
      alert('Du er nu i gang med at downloade et spil (' + GameName + '), hurra!');
    }
  }
}
