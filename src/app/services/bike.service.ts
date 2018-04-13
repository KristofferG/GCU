import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Bike} from '../dbmodels/bike';

import 'rxjs/add/operator/map';

@Injectable()
export class BikeService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000';

  registerBike(bike){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(`${this.serverApi}/bikes/register-bike`, bike, {headers: headers})
      .map(res => res.json());
  }

  // Mutiple bikes
  registerBikes(bikeList){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log("bike.service.ts bikelist= " + bikeList)
    return this.http.post(`${this.serverApi}/bikes/register-bikes`, bikeList, {headers: headers})
      .map(res => res.json());
  }

  public getAllBikes():Observable<Bike[]> {

    let URI = `${this.serverApi}/bikes/`;
    return this.http.get(URI)
    .map(res => res.json())
    .map(res => <Bike[]>res.bikes);
  }

//Get all bikes by depot
  public getAllBikesByDepot(activeUserDepot : string):Observable<Bike[]>{
    let URI = `${this.serverApi}/bikes/depot/${activeUserDepot}`;
    return this.http.get(URI)
    .map(res => res.json())
    .map(res => <Bike[]>res.bikes);
  }

  public deleteBike(bikeId : string) {
    var r = confirm("Är du säker på att du vill radera cykeln?")
      if (r == true) {
        let URI = `${this.serverApi}/bikes/${bikeId}`;
          let headers = new Headers;
          headers.append('Content-Type', 'application/json');
          return this.http.delete(URI, {headers})
          .map(res => res.json());
      } else {
      }
  }
  public updateBike(id, bike) {
        let URI = `${this.serverApi}/bikes/${id}`;
          console.log("bike.service bike= " + bike.status);
          let headers = new Headers;
          headers.append('Content-Type', 'application/json');
          return this.http.put(URI, bike, {headers})
          .map(res => res.json());
      }
}
