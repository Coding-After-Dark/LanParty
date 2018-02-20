import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class ConnectionService {
serverIP: any = "yolo"; // Is the given IP from the server
  constructor(private _electronService: ElectronService) {
console.log("this is constructor of service")
    if (this._electronService.isElectronApp) {
      this.serverIP = this._electronService.ipcRenderer.sendSync('getServerIP');

    } else {
      this.serverIP = '127.0.0.1';
    }
    console.log(this.serverIP);
  }

}
