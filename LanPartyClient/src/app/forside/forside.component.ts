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
  procent;

  constructor(_connectionService: ConnectionService, 
    public _gameService: GameService, 
    private _electronService: ElectronService,
    private ref: ChangeDetectorRef) {
    this.title = _connectionService.serverIP;

  }

  ngOnInit() {
  }

  uploadGame() {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('selectGame');
    }
  }
}
