import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss']
})
export class ForsideComponent implements OnInit {

  title: any;
  constructor(_connectionService: ConnectionService) {
    this.title = _connectionService.serverIP;
   }

  ngOnInit() {
  }

}
