import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./Authentication.Service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor() { }

  title = 'app works!';
}
