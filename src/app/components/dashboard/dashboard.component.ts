import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { DepotService } from '../../services/depot.service';
import {Router} from '@angular/router';
import {Bike} from '../../dbmodels/bike';
import { Depot } from '../../dbmodels/depot';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private bikes: Bike[] = [];
  private depots: Depot[] = [];

  constructor(
    private bikeService: BikeService,
    private router: Router,
    private depotService: DepotService
  ) { }

  ngOnInit() {

    // Load all Bikes on init
    this.loadBikes();

    this.loadDepots();

  }

  public loadDepots(){
    this.depotService.getAllDepots().subscribe(
      response => this.depots = response, )
  }

  public loadBikes(){
    this.bikeService.getAllBikes().subscribe(
      response => this.bikes = response, );
      this.sortBikes();
  }

  public sortBikes(){
    setTimeout(() =>
{
  var toyotaCount = this.bikes.filter(x => x.depot === "Burgsvik").length;
  console.log(toyotaCount);
  for (let bike of this.bikes) {

  console.log("sort= " + bike);
};
},
1200);
  //  var bikes = this.bikes;

  }

}
