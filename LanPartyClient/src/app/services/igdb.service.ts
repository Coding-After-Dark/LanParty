import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class IgdbService {
  reqHeader = new HttpHeaders({'user-key': 'a0cd2197533deeb75801ba26e84841ca'});

  constructor(public http: HttpClient) {
   }

  getNames(name: string) {
    return this.http.get('https://cors-anywhere.herokuapp.com/https://api-endpoint.igdb.com/games/?search=' + name + '&fields=name,id,cover',
     {headers: this.reqHeader});
  }
  getGameInfo(Id) {
    return this.http.get('https://cors-anywhere.herokuapp.com/https://api-endpoint.igdb.com/games/' + Id + '?fields=*',
     {headers: this.reqHeader});
  }
}
