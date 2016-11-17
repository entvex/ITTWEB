import { Injectable } from '@angular/core';
import {Http, Response, Headers, Request, RequestMethod, RequestOptions} from '@angular/http';
import {User} from "./user";
import {Body} from "@angular/http/src/body";
import {Observable} from "rxjs";

@Injectable()
export class WebapiService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private requestoptions = new RequestOptions();
  private apiUrl = "https://safe-brook-20517.herokuapp.com/api/";

  constructor(private http: Http) {}


  NewRegister() {
    this.PostRequest("https://safe-brook-20517.herokuapp.com/api/register","data");
  }

  GetdataTest()
  {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/x-www-form-urlencoded");
    this.headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODI5YzIxMGMxYjVjMTAyYjBkZTU2ZjIiLCJlbWFpbCI6ImRvbmFsZFRydW1wQGdlZWsuY29tIiwibmFtZSI6IkRvbmFsZCBUcnVtcCIsImV4cCI6MTQ3OTczNjQ2NCwiaWF0IjoxNDc5MTMxNjY0fQ.1TzaA4VIW3BBb6rWgzr7nSv4aVFr40Co0kYqoW-jyeE");
    this.requestoptions = new RequestOptions({
      method: RequestMethod.Get,
      url: "https://safe-brook-20517.herokuapp.com/api/workouts/donaldTrump@geek.com",
      headers: this.headers,
      body: {email : "donaldTrump@geek.com", }
    })
    console.log("data");
    return this.http.request(new Request(this.requestoptions)).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("data2");
    let body = res.json();
    console.log(body);
  }

  PostRequest(url,data) {
    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Authorization", 'Bearer ' + localStorage.getItem('id_token'));

    this.requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: url,
      headers: this.headers,
      body: {email : "donaldTrump@geek.com", }
    })

    return this.http.request(new Request(this.requestoptions))
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}


