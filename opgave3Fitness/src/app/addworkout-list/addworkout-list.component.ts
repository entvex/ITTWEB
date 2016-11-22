import { Component, OnInit ,OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-addworkout-list',
  templateUrl: './addworkout-list.component.html',
  styleUrls: ['./addworkout-list.component.css']
})
export class AddworkoutListComponent implements OnInit,OnDestroy {

  private subscription : Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  constructor(private route: ActivatedRoute)
  {

  }

  numberOfSets = [1,2,3,4,5,6,7,8,9,10];
  numberOfReps = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20,30,45,60];
  repType = ["reps","min","sec"];
  dataReady :boolean = false;
  numberOfExercises : Number[] = [];

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (param: any) => {
        let number = param["workoutNo"];

        for(let i=0; i < number; i++) {
          this.numberOfExercises.push(i);
        }
        this.dataReady = true;
      }
    )
  }
}
