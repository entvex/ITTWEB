import { Injectable } from '@angular/core';
import {Http, Response, Headers, Request, RequestMethod, RequestOptions} from '@angular/http';
import {User} from "./user";
import {Body} from "@angular/http/src/body";

export class webapiService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private requestoptions = new RequestOptions();
  private apiUrl = "https://safe-brook-20517.herokuapp.com/api/";

  constructor(private http: Http) {}

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
      .map((res: Response) => {
        if (res) {
          return [{ status: res.status, json: res.json() }]
        }
      });
  }


}


