import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  loggedIn: boolean = false;

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);
    if (user)
      this.loggedIn = true;
  }

}
