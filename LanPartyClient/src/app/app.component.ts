import { Component, OnInit } from '@angular/core';
import {GameserviceService} from './gameservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  constructor(private GameService: GameserviceService) { }

  title = 'app';
  ngOnInit() {
  }
}
