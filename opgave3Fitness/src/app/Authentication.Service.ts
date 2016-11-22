import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
  url: String = "http://localhost:3000/api/";
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

  getWorkoutList(email: string, token: string): Observable<boolean> {
    return this.http.post(this.url + 'workouts', { email: email,token: "Bearer "+ token})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response

        let token = response.json() && response.json().token;
        if (token) {
          
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

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
