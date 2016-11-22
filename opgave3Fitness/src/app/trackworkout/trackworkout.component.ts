import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trackworkout',
  templateUrl: './trackworkout.component.html',
  styleUrls: ['./trackworkout.component.css']
})
export class TrackworkoutComponent implements OnInit {


  dataReady:boolean = false;

  constructor() { }

  ngOnInit() {
    let number
    for(let i=0; i < number; i++) {
      this.Workouts.push(i);
    }
    this.dataReady = true;
  }
  }

}
