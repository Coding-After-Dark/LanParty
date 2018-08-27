import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { ElectronService } from 'ngx-electron';
import { IgdbService } from '../services/igdb.service';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from '../games/shared/game.service';
@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss']
})
export class ForsideComponent implements OnInit {
  openModal = false;
  title: any;
  connection;
  test;
  procent;
  selectedGame: any;
  games: any = [];
  subscription: Subscription;
  GameInfo: any;
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
  lookUp(name: string) {
    console.log(name);
    name = name.trim();
    if (name === undefined || name === '') {
      return this.games = [];
    } else {

      if (this.subscription !== undefined) {
        this.subscription.unsubscribe();
      }
      this.subscription = this._igdb.getNames(name).subscribe(
        (data: any) => {
          const res = data.filter(p => p.cover === undefined);
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            element.cover = {
              'url': '//images.igdb.com/igdb/image/upload/t_thumb/nocover_qhhlj6.jpg'
            };
          }
          this.games = data;
          console.log('gotGames');
        }
      );
    }
  }
  selectGame(game) {
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
