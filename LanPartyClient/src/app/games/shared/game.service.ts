import { Injectable, ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../../services/socket.service';

import { Observable } from 'rxjs/Observable';
import { ElectronService } from 'ngx-electron';

import { IGame } from './game';

@Injectable()
export class GameService {
  games: IGame[] = [];
  constructor(public _socketService: SocketService, private _electronService: ElectronService, public ref: ChangeDetectorRef) {

    this.getGames().subscribe((games: IGame[]) => {
      this.games = games;
    });

    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.on('stopDownloading', (event, data) => {
        const game = this.games.find(p => p.slug === data.split('.')[0]);
        game.percentage = 100;
        game.state = 2;
        console.log(game);
        ref.detectChanges();
      });

      this._electronService.ipcRenderer.on('updateP', (event, data) => {
        const game = this.games.find(p => p.slug === data.name.split('.')[0]);

        game.percentage = data.percentage.toFixed(0);
        console.log(game.percentage);
        ref.detectChanges();
      });
    }
    // this.getGames().subscribe(games => {
    //   this.games = games;
    // });

//     this.games = [
//   {
//     id: 133,
//     title: 'Warcraft III: The Frozen Throne',
//     slug: 'warcraft-iii-the-frozen-throne',
//     genre: 'Rts',
//     description: 'Real-time strategy game in a fantasy setting.',
//     imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/warkeyigiyyknusmfev2.jpg',
//     playerCount: 10,
//     state: 0,
//     percentage: 0
//   },
//   {
//     id: 124,
//     title: 'Left 4 Dead 2',
//     slug: 'left_4_dead_2',
//     genre: 'Fps',
//     // tslint:disable-next-line:max-line-length
//     description: 'Left 4 Dead 2 is a 2-4 player co-op first person shooter that requires tons of cooperation and intense zombie slaughtering in order to survive.There is a variety of enemies, weapons, and objectives to keep things interesting, with co-op that is focused around having fun playing with your friends.',
//     imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/eckumjvspgvgsap4wmp2.jpg',
//     playerCount: 4,
//     state: 0,
//     percentage: 0
//   },
//   {
//     id: 2963,
//     title: 'Dota 2',
//     slug: 'dota-2',
//     genre: 'Rts',
//     // tslint:disable-next-line:max-line-length
//     description: 'Dota 2 is a multiplayer online battle arena video game and the stand-alone sequel to the Defense of the Ancients (DotA) mod. Each match of Dota 2 involves two teams, both containing five players and occupying a fortified stronghold at either end of the map. Victory is achieved by destroying the enemys Ancient, a building that is invulnerable until certain objectives are achieved. Each player controls a "Hero" character and focuses on leveling up, acquiring items and fighting against the other team to achieve victory during each match.',
//     imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/qcx7vedma0pvf0hzisxc.jpg',
//     playerCount: 5,
//     state: 0,
//     percentage: 0
//   },
//   {
//     id: 11198,
//     title: 'Rocket League',
//     slug: 'rocket-league',
//     genre: 'Sports',
//     // tslint:disable-next-line:max-line-length
//     description: 'Rocket League is a third-person, physics based soccer game, where players control rocket powered cars in order to hit the ball towards a goal. Basically, a car based soccer/football game.',
//     imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover_qhhlj6.jpg',
//     playerCount: 3,
//     state: 0,
//     percentage: 0
//   },
//   {
//     id: 891,
//     title: 'Team Fortress 2',
//     slug: 'team-fortress-2',
//     genre: 'Fps',
//     // tslint:disable-next-line:max-line-length
//     description: 'Team Fortress 2 is a multi-platform, first-person shooter, multiplayer game that focuses on team based gameplay, where each player has their own unique role on the team.',
//     imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/ijp2rheve0eccuhtanli.jpg',
//     playerCount: 4,
//     state: 0,
//     percentage: 0
//   },
//   {
//     id: 888,
//     title: 'Supreme Commander: Forged Alliance',
//     slug: 'supreme-commander-forged-alliance',
//     genre: 'Rts',
//     description: 'Supreme Commander is a real time strategy game set in a fictional sci-fi universe.',
//     imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/x2gbk38zhbhxhs2omgsr.jpg',
//     playerCount: 7,
//     state: 0,
//     percentage: 0
//   },
// ];

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
