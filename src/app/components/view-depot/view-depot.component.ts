import { Component, OnInit } from '@angular/core';
import { DepotService } from '../../services/depot.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Depot } from '../../dbmodels/depot';

@Component({
  selector: 'app-view-depot',
  templateUrl: './view-depot.component.html',
  styleUrls: ['./view-depot.component.css']
})
export class ViewDepotComponent implements OnInit {

  private depots: Depot[] = [];

  constructor(private depotService: DepotService, private router: Router, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {

    // Load all depots on init
    this.loadDepots();
  }

  public loadDepots(){
    this.depotService.getAllDepots().subscribe(
      response => this.depots = response, )
  }

  //deleteDepot. The deleted depot is being filtered out using the .filter method
  public deleteDepot(depot: Depot) {
    this.depotService.deleteDepot(depot._id).subscribe(data => {
      if(data.success){
        this.depots = this.depots.filter(depots => depots !== depot);
        this.flashMessagesService.show('Depå raderad', {cssClass: 'alert-warning', timeout: 4000});
      } else {
        this.flashMessagesService.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  };

}
