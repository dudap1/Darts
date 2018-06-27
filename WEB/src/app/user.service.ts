import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cookie } from 'ng2-cookies';
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import * as _ from "lodash";

declare const google: any;

@Injectable()
export class UserService {

  headers = new HttpHeaders({
    'Authorization': 'Basic bmllZHppZWxlci1hZG1pbjp0ZXN0'
  });


  loggedAsAdmin = false;
  eventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  location;
  chips: string[];

  constructor(private http: HttpClient, private router: Router) {
    if (Cookie.get('access_token')) {
      this.loggedAsAdmin = true;
    }

  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
  }

  login(user, password) {
    let form = new FormData();
    form.append("grant_type", "password");
    form.append("username", user);
    form.append("password", password);
    form.append("client_id", "niedzieler-admin");

    return this.http.post('/api/oauth/token', form, {headers: this.headers});
  }

  checkCredentials() {
    return Cookie.check('access_token');
  }

  logout() {
    Cookie.delete('access_token');
    this.loggedAsAdmin = false;
    this.eventEmitter.emit(this.loggedAsAdmin);
    this.router.navigate(['map']);
  }

}
