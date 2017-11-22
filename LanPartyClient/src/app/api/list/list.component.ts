import { Component, OnInit } from '@angular/core';
import {GameserviceService} from '../../gameservice.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  Stuff;
  constructor(private gameService:GameserviceService) { }

  ngOnInit() {
    this.Stuff = this.gameService.Stuff;
    alert(this.gameService.Stuff);
  }

}
