import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { DepotService } from '../../services/depot.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Bike} from '../../dbmodels/bike';
import {Depot} from '../../dbmodels/depot';

@Component({
  selector: 'app-add-bike',
  templateUrl: './add-bike.component.html',
  styleUrls: ['./add-bike.component.css']
})

export class AddBikeComponent implements OnInit {
  name: String;
  number: number;
  gears: number;
  size: number;
  basket: Boolean;
  updated: Date;
  status: String;
  type: String;
  depot: String;
  antal: number;

  private bikes: Bike[] = [];
  private depots: Depot[] = [];

  constructor(private bikeService: BikeService, private depotService: DepotService, private router: Router, private flashMessage:FlashMessagesService, private validateService: ValidateService) { }

  ngOnInit() {

    // Load all depots on init
    this.loadDepots();

  }

  public loadDepots(){
    this.depotService.getAllDepots().subscribe(
      response => this.depots = response, )
  }

  onRegisterSubmit(){
    const bike = {
      name: this.name,
      number: this.number,
      gears: this.gears,
      size: this.size,
      basket: this.basket,
      updated: this.updated,
      status: this.status,
      type: this.type,
      depot: this.depot,
      antal: this.antal
    }


    // Required Fields
    if(!this.validateService.validateBike(bike)){
    this.flashMessage.show('Ange ett namn på cykeln', {cssClass: 'alert-danger', timeout: 4000});
    return false;
    }

    if(this.antal > 1) {
      var bikeList = [];
      console.log('Fler än 1');
      for (var i=1; i<=this.antal; i++) {
        console.log('en etta ' + bike.toString());
        console.log('Nummer: ' + bike.number);
        let bikeTemp = {
          name: bike.name,
          number: bike.number ++,
          gears: bike.gears,
          size: bike.size,
          basket: bike.basket,
          updated: bike.updated,
          status: bike.status,
          type: bike.type,
          depot: bike.depot};
        bikeList.push(bikeTemp);
      }
      // Register Multiple Bikes
      this.bikeService.registerBikes(bikeList).subscribe(data => {
        if(data.success){
          this.flashMessage.show('Cyklar tillagda', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/bikes']);
        } else {
          this.flashMessage.show('Något gick galet. Kontrollera så att cykelns nummer inte redan är taget', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/add-bike']);
        }
      });

    } else {
      console.log('Färre än 2');
      // Register Bike
      this.bikeService.registerBike(bike).subscribe(data => {
        if(data.success){
          this.flashMessage.show('Cykel tillagd', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/bikes']);
        } else {
          this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/add-bike']);
        }
      });
    }

    console.log("Bikelist= " + JSON.stringify(bikeList));


  }


}
