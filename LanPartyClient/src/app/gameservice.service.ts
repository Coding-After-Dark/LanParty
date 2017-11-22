import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameserviceService {
Stuff:any;
  constructor(private http: HttpClient) {}

  GetStuff(){
  this.http.get('http://localhost:50533/api/Game').subscribe(data => {
    // Read the result field from the JSON response.
    this.Stuff = data;
    console.log(this.Stuff)
    });
  }

}
