import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { ConnectionService } from './connection.service';

@Injectable()
export class SocketService {
  socket: any;
  constructor(public _connectionService: ConnectionService) {
    this.socket = io('http://' + _connectionService.serverIP +  ':3001');
   }

}
