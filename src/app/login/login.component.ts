import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utils} from "../shared/utils";
declare const $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username;
  password;

  constructor(private http: HttpClient, private router: Router, private UserService: UserService) { }

  ngOnInit() {
  }

  login() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa(`${this.username}:${this.password}`));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    const httpOptions = {
      withCredentials: true,
      headers: headers
    };

    this.http.post('https://edarter2.herokuapp.com/api/login', `username=${this.username}&password=${this.password}`, httpOptions)
      .subscribe((response) => {
        this.UserService.login();
        Utils.showNotification("zalogowano", 'success');
        this.router.navigate(['/add-room']);
      }, (error) => {
        console.log(error);
      });

  }
}
