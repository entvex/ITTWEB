import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-addworkout-list',
  templateUrl: './addworkout-list.component.html',
  styleUrls: ['./addworkout-list.component.css']
})
export class AddworkoutListComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }


  numberOfSets = [1,2,3,4,5,6,7,8,9,10];
  numberOfReps = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20,30,45,60];
  repType = ["reps","min","sec"];
  number : String;

  ngOnInit() {
    this.number = this.route.queryParams['workoutNo'];
    console.log(this.number);
  }

}
