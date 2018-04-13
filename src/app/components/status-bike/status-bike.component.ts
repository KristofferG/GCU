import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Bike} from '../../dbmodels/bike';

@Component({
  selector: 'app-status-bike',
  templateUrl: './status-bike.component.html',
  styleUrls: ['./status-bike.component.css']
})
export class StatusBikeComponent implements OnInit {

  private bikesByDepot: Bike[] = [];
  private activeUserDepot = "Test";

  constructor(private bikeService: BikeService, private router: Router, private flashMessage: FlashMessagesService, private authService: AuthService) { }

  ngOnInit() {


  this.loadBikesByDepot();

  }

  //Get all bikes by depot
  public loadBikesByDepot(){
    var activeUserDepot = localStorage.getItem("userDepot");
    this.bikeService.getAllBikesByDepot(activeUserDepot).subscribe(
      response => this.bikesByDepot = response, )
  }


  //Change status to available.
  public makeBikeAvail(bike: Bike) {
    bike.status = "Ledig";
    this.bikeService.updateBike(bike._id, bike).subscribe(data => {
      if(!data.success){
        this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  };

  //Change status to occupied.
  public makeBikeOcc(bike: Bike) {
    bike.status = "Uthyrd";
    this.bikeService.updateBike(bike._id, bike).subscribe(data => {
      if(!data.success){
        this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  };

  //Change status to unavailable.
  public makeBikeBroken(bike: Bike) {
    bike.status = "Behöver reparation";
    this.bikeService.updateBike(bike._id, bike).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Cykel markerad som trasig', {cssClass: 'alert-warning', timeout: 4000});
      } else {
        this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 4000});
      }
    });
  };

}
