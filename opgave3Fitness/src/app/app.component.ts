import {Component, OnInit} from '@angular/core';
import {WebapiService} from "./webapi.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebapiService]
})
export class AppComponent implements OnInit {

  constructor(private webapiService: WebapiService) { }

  ngOnInit(): void {
    this.webapiService.GetdataTest();
  }

  title = 'app works!';
}
