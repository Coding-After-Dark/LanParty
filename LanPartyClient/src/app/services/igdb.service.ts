import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class IgdbService {
  reqHeader = new HttpHeaders({'user-key': '124dd866af36e6eb255fb6d4450f9acd'});

  constructor(public http: HttpClient) {
   }

  getNames(name: string) {
    console.log(name);
    return this.http.get('https://cors-anywhere.herokuapp.com/https://api-endpoint.igdb.com/games/?search=' + name + '&fields=name,id,cover',
     {headers: this.reqHeader});
  }
  getGameInfo(Id) {
    return this.http.get('https://cors-anywhere.herokuapp.com/https://api-endpoint.igdb.com/games/' + Id + '?fields=*',
     {headers: this.reqHeader});
  }
}
