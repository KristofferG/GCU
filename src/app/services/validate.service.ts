import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

// User

  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined || user.depot == undefined){
      return false ;
    } else {
      return true;
    }
  }
  validateEmail(email){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
  }


  // Depot
  validateDepot(depot){
    if(depot.name == undefined){
      return false;
    } else {
      return true;
    }
  }

  // Bike
  validateBike(bike){
    if(bike.name == undefined || bike.number == undefined || bike.depot == undefined){
      return false;
    } else {
      return true;
    }
  }

}
