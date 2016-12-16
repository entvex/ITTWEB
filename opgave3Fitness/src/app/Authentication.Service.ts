import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class AuthenticationService {
  url: String = "http://localhost:3000/api/";
  //url: String = "http://www.safe-brook-20517.herokuapp.com/api/";
  public token: string;


  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.url + 'login', { email: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response

        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch(err => {
        console.log("caught exception" + err.status);
        return Observable.throw(err);
      });
  }

  register(username: string,email: string, password: string): Observable<boolean> {
    return this.http.post(this.url + 'newuser', { name: username,email: email, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response

        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch(err => {
        console.log("caught exception" + err.status);
        return Observable.throw(err);
      });
  }

  addWorkout(ExerciseName0: string,Description0: string, numberOfSets0: string,numberOfReps0: number,repType0: number,workoutName: string,author: string, token: string): Observable<boolean> {

    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + 'workouts/1', { email: author,workoutName: workoutName,ExerciseName0: ExerciseName0,Description0: Description0,repType0: repType0, numberOfReps0: numberOfReps0,numberOfSets0: numberOfSets0 },options)
      .map((response: Response) => {

        let data = response.json();
        if (data) {

          return true;
        } else {
          return false;
        }
      }).catch(err => {
        console.log("caught exception" + err.status);
        return Observable.throw(err);
      });
  }

  getWorkoutList(email: string, token: string): Observable<any> {
    console.log(email);
    console.log("Bearer "+ token);


    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + 'workouts/' + email,options)
      .map((response: Response) => {

        let data = response.json();
        if (data) {
          return data;
        } else {
          return false;
        }
      }).catch(err => {
        console.log("caught exception" + err.status);
        return Observable.throw(err);
      });
  }

  markWorkoutAsFinished(workoutName: string, token: string): Observable<boolean> {
    console.log(workoutName);
    console.log("Bearer "+ token);
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });

    console.log(this.url + 'workouts/' + workoutName);

    return this.http.patch(this.url + 'workouts/' + workoutName,"",options)
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          return true;
        } else {
          return false;
        }
      }).catch(err => {
        console.log("caught exception" + err.status);
        return Observable.throw(err);
      });
  }
}
