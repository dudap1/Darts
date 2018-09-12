import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cookie } from 'ng2-cookies';
import { Router } from "@angular/router";

@Injectable()
export class UserService {

  logged = false;
  _login = null;
  eventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.http.get("https://edarter2.herokuapp.com/api/whoAmI").subscribe((data: any) => {
      this._login = data.login;
      this.logged = !!this._login;
      this.eventEmitter.emit(this.logged);
    });
  }

  login() {
    this.logged = true;
    this.eventEmitter.emit(this.logged);
    this.router.navigate(['login']);
  }

  logout() {
    Cookie.delete('JSESSIONID');
    this.logged = false;
    this.eventEmitter.emit(this.logged);
    this.http.get("https://edarter2.herokuapp.com/api/logout").subscribe(() => {});
    this.router.navigate(['login']);
  }
}
