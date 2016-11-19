import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TrackworkoutComponent} from "./trackworkout/trackworkout.component"
import {AddworkoutComponent} from "./addworkout/addworkout.component";

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MainComponent} from "./main/main.component";
import {AddworkoutListComponent} from "./addworkout-list/addworkout-list.component";

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main',  component: MainComponent },
  { path: 'trackworkout',  component: TrackworkoutComponent },
  { path: 'addworkout', component: AddworkoutComponent },
  { path: 'addworkout/:workoutNo', component: AddworkoutListComponent },
  { path: 'login',     component: LoginComponent},
  { path: 'register',     component: RegisterComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class appRoutingModule {

}
