import { Component, OnInit } from '@angular/core';
import {GameserviceService} from '../../gameservice.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private gameService: GameserviceService) { }

  ngOnInit() {

  }

}
