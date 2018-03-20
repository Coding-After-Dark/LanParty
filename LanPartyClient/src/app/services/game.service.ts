import { Injectable , ChangeDetectorRef } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs/Observable';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class GameService {
  games: any;
  constructor(public _socketService: SocketService, private _electronService: ElectronService) {
    this.getGames().subscribe(games => {
      this.games = games;
    });

   }
   getGames() {
    const observable = new Observable(observer => {
      this._socketService.socket.on('syncGameList', (data) => {
        observer.next(data);
        console.log(data);
      });
      return () => {
        this._socketService.socket.disconnect();
      };
    });
    return observable;
  }
}
