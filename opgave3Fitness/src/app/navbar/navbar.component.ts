import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../Authentication.Service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(
    private authenticationService: AuthenticationService) {
    authenticationService.userIsloggedIn.subscribe(isLoggedIn => {
      console.log("event rev");
      this.loggedIn = isLoggedIn;
    });
  }

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);
    if (user)
      this.loggedIn = true;
  }

}
