import { Component, OnInit } from '@angular/core';
import {Exercise,Workout} from "../Exercise"
import {AuthenticationService} from "../Authentication.Service"
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trackworkout',
  templateUrl: './trackworkout.component.html',
  styleUrls: ['./trackworkout.component.css']
})
export class TrackworkoutComponent implements OnInit {


  data: any="";
  dataReady:boolean = false;

  constructor(private webapiService: AuthenticationService) { }

  ngOnInit() {
    var obj = JSON.parse(localStorage.getItem("currentUser"));

    this.webapiService.getWorkoutList(obj.username,obj.token).subscribe(result => {
    console.log("MERPPS");
    console.log(result.toString());

      this.data = result;
      console.log("data is" + result[0].workoutName);
      this.dataReady = true;
    });
    }


  }



