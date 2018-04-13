import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import { DepotService } from '../../services/depot.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {Depot} from '../../dbmodels/depot';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  admin: Boolean;
  depot: String;

  private depots: Depot[] = [];

  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private depotService:DepotService,
    private router:Router
  ) { }

  ngOnInit() {
    // Load all depots on init
    this.loadDepots();
  }

  public loadDepots(){
    this.depotService.getAllDepots().subscribe(
      response => this.depots = response, )
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      admin: this.admin,
      depot: this.depot
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
    this.flashMessage.show('Fyll i all fält', {cssClass: 'alert-danger', timeout: 3000});
    return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
    this.flashMessage.show('Ange en giltig epostadress', {cssClass: 'alert-danger', timeout: 3000});
    return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Ett konto är nu skapat', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Något gick galet.', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
