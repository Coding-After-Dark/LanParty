import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { GameService } from '../services/game.service';
import { ElectronService } from 'ngx-electron';
import { IgdbService } from '../services/igdb.service';
@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss']
})
export class ForsideComponent implements OnInit {
  title: any;
  connection;
  test;
  procent;
  selectedGame: any;
  games: any = [  ];
  GameInfo:any;
  constructor(_connectionService: ConnectionService,
    public _gameService: GameService, 
    private _electronService: ElectronService,
    private ref: ChangeDetectorRef,
    public _igdb: IgdbService) {
    this.title = _connectionService.serverIP;

  }

  ngOnInit() {
  }

  uploadGame() {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('selectGame');
    }
  }
  lookUp(name) {
    console.log(name);
    this._igdb.getNames(name).subscribe(
      (data:any) => {
        var res = data.filter(p => p.cover === undefined);
        for (let index = 0; index <  res.length; index++) {
          const element = res[index];
          element.cover = {
            'url': 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover_qhhlj6.jpg'
          };
        }
        this.games = data;
      }
    );
    console.log(this.games);
  }
  selectGame(game){
    this.selectedGame = game;
    this.games = [];
    this._igdb.getGameInfo(game.id).subscribe(
      (data) => {
        this.GameInfo = data;
        console.log(data);
        if (this._electronService.isElectronApp) {
          this._electronService.ipcRenderer.send('selectGame', data);
        }
      }
    );

  }

}
