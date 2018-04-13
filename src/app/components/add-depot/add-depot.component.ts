import { Component, OnInit } from '@angular/core';
import { DepotService } from '../../services/depot.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.css']
})

export class AddDepotComponent implements OnInit {
    name: String;
    address: String;
    shortname: String;
    phone: String;

//  private depots: Depot[] = [];

  constructor(private depotService: DepotService, private router: Router, private flashMessage:FlashMessagesService, private validateService: ValidateService) { }

  ngOnInit() {


  }


  onRegisterSubmit(){
    const depot = {
      name: this.name,
      shortname: this.shortname,
      address: this.address,
      phone: this.phone
    }

    // Required Fields
    if(!this.validateService.validateDepot(depot)){
    this.flashMessage.show('Ange ett namn på Depån', {cssClass: 'alert-danger', timeout: 4000});
    return false;
    }


    // Register depot
    this.depotService.registerDepot(depot).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Depå tillagd', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/depot']);
      } else {
        this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/add-depot']);
      }
    });
  }


}
