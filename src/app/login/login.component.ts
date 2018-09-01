import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "../shared/utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username;
  password;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    this.http.post('https://edarter2.herokuapp.com/api/login', `username=${this.username}&password=${this.password}`, {headers: headers})
      .subscribe((response) => Utils.showNotification("zalogowano", 'success'));
    // this.http.post('/api/login', {username: this.username, password: this.password}).subscribe((response) => Utils.showNotification("yay", 'success'));
  }
}
