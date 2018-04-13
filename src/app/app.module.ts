import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddDepotComponent } from './components/add-depot/add-depot.component';
import { ViewDepotComponent } from './components/view-depot/view-depot.component';
import { AddBikeComponent } from './components/add-bike/add-bike.component';
import { ViewBikeComponent } from './components/view-bike/view-bike.component';
import { StatusBikeComponent } from './components/status-bike/status-bike.component';
import { EditBikeComponent } from './components/edit-bike/edit-bike.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import {DepotService} from './services/depot.service';
import {BikeService} from './services/bike.service';

import {BikeFilterPipe} from './filters/bikeFilterPipe';
import {BikeNumberFilter} from './filters/bikeNumberFilter';



const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'add-depot', component: AddDepotComponent},
  {path:'depot', component: ViewDepotComponent},
  {path:'add-bike', component: AddBikeComponent},
  {path:'edit-bike', component: EditBikeComponent},
  {path:'bikes', component: ViewBikeComponent},
  {path:'bike-status', component: StatusBikeComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AddDepotComponent,
    ViewDepotComponent,
    AddBikeComponent,
    ViewBikeComponent,
    StatusBikeComponent,
    BikeFilterPipe,
    BikeNumberFilter,
    EditBikeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, DepotService, BikeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
