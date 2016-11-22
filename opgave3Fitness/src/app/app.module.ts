import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TrackworkoutComponent } from './trackworkout/trackworkout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddworkoutComponent } from './addworkout/addworkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {appRoutingModule} from "./app-routing.module";
import { MainComponent } from './main/main.component';
import { AddworkoutListComponent } from './addworkout-list/addworkout-list.component';
import {AuthenticationService} from "./Authentication.Service";

@NgModule({
  declarations: [
    AppComponent,
    TrackworkoutComponent,
    NavbarComponent,
    AddworkoutComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    AddworkoutListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
