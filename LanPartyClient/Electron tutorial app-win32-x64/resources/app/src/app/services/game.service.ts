import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class GameService {
  constructor(public _socketService: SocketService) {
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
