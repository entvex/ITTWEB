import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../Authentication.Service"

@Component({
  selector: 'app-trackworkout',
  templateUrl: './trackworkout.component.html',
  styleUrls: ['./trackworkout.component.css']
})
export class TrackworkoutComponent implements OnInit {
  data: any="";
  dataReady:boolean = false;

  constructor(private webapiService: AuthenticationService) { }

  finishWorkout(workOutName: any) {

    let obj = JSON.parse(localStorage.getItem("currentUser"));
    this.webapiService.markWorkoutAsFinished(workOutName,obj.token).subscribe(result => {
      console.log("patching workout");
    }, error => {
      if (error.status === 404){
        console.log("Something went wrong!");
      }
      if (error.status === 401){
        console.log("Unauthorized");
      }
    });
  }

  ngOnInit() {
    let obj = JSON.parse(localStorage.getItem("currentUser"));

    this.webapiService.getWorkoutList(obj.username,obj.token).subscribe(result => {
    console.log(result.toString());

      this.data = result;
      console.log("data is" + result[0].workoutName);
      this.dataReady = true;
    });
    }
  }
