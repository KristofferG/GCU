import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Depot} from '../dbmodels/depot';

import 'rxjs/add/operator/map';

@Injectable()
export class DepotService {
  depot: any;

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000';

  registerDepot(depot){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(`${this.serverApi}/depots/register-depot`, depot, {headers: headers})
      .map(res => res.json());
  }

  public getAllDepots():Observable<Depot[]> {

    let URI = `${this.serverApi}/depots/`;
    return this.http.get(URI)
    .map(res => res.json())
    .map(res => <Depot[]>res.depots);
  }

  public deleteDepot(depotId : string) {
    var r = confirm("Är du säker på att du vill radera depån?")
      if (r == true) {
        let URI = `${this.serverApi}/depots/${depotId}`;
          let headers = new Headers;
          headers.append('Content-Type', 'application/json');
          return this.http.delete(URI, {headers})
          .map(res => res.json());
      } else {
      }
  }

}
