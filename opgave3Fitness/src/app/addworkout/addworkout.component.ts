import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.component.html',
  styleUrls: ['./addworkout.component.css']
})
export class AddworkoutComponent implements OnInit {

  exerciesNumbers = [2,4,6,8,10];

  constructor() { }
  ngOnInit() {
  }

}
