import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Bike} from '../../dbmodels/bike';
import {BikeFilterPipe} from '../../filters/bikeFilterPipe';
import {BikeNumberFilter} from '../../filters/bikeNumberFilter';

@Component({
  selector: 'app-view-bike',
  templateUrl: './view-bike.component.html',
  styleUrls: ['./view-bike.component.css']
})
export class ViewBikeComponent implements OnInit {

  private bikes: Bike[] = [];

  constructor(private bikeService: BikeService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {

    // Load all Bikes on init
    this.loadBikes();

  }

  public loadBikes(){
    this.bikeService.getAllBikes().subscribe(
      response => this.bikes = response, )
  }


  //delete Bike. The deleted bike is being filtered out using the .filter method
  public deleteBike(bike: Bike) {
    this.bikeService.deleteBike(bike._id).subscribe(data => {
      if(data.success){
        this.bikes = this.bikes.filter(bikes => bikes !== bike);
        this.flashMessage.show('Cykel raderad', {cssClass: 'alert-warning', timeout: 4000});
      } else {
        this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  };

  //Change status to available.
  public makeBikeAvail(bike: Bike) {
    bike.status = "Ledig";
    this.bikeService.updateBike(bike._id, bike).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Cykel test raderad', {cssClass: 'alert-warning', timeout: 4000});
      } else {
        this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  };

  //Change status to available.
  public makeBikeOcc(bike: Bike) {
    bike.status = "Uthyrd";
    this.bikeService.updateBike(bike._id, bike).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Cykel test raderad', {cssClass: 'alert-warning', timeout: 4000});
      } else {
        this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  };

  //Change status to available.
  public makeBikeBroken(bike: Bike) {
    bike.status = "Behöver reparation";
    this.bikeService.updateBike(bike._id, bike).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Cykel test raderad', {cssClass: 'alert-warning', timeout: 4000});
      } else {
        this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  };

}
