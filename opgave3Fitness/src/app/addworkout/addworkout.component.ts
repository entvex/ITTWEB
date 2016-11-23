import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../Authentication.Service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.component.html',
  styleUrls: ['./addworkout.component.css']
})
export class AddworkoutComponent implements OnInit {

  addWorkoutForm: FormGroup;

  numberOfSets = [1,2,3,4,5,6,7,8,9,10];
  numberOfReps = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20,30,45,60];
  repType = ["reps","min","sec"];

  constructor(private webAPI:AuthenticationService,private fb:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.addWorkoutForm = this.fb.group({
      ExerciseName0: [''],
      Description0:  [''],
      numberOfSets0: [''],
      numberOfReps0: [''],
      repType0: [''],
      workoutName: ['']
    });
  }

  onSubmit(form: any) {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    this.webAPI.addWorkout(form.ExerciseName0,form.Description0,form.numberOfSets0,form.numberOfReps0,form.repType0,form.workoutName,user.username,user.token).subscribe(result => {
      console.log("data submited");
      this.router.navigate(['./trackworkout']);
    }, error => {
      if (error.status === 401){
        console.log('error submitting data');
      }
    });
  }

}
