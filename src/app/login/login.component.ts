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
    // headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

    const httpOptions = {
      withCredentials: true,
      headers: headers
    };

    this.http.post('http://localhost:8080/api/login', `username=${this.username}&password=${this.password}`, httpOptions)
      .subscribe((response) => {
        console.log(response);
        Utils.showNotification("zalogowano", 'success')
      }, (error) => {
        console.log(error);
      });

    $.ajax({
      type: "POST",
      beforeSend: (request) => {
        request.setRequestHeader("Authorization", "Basic " + btoa(`${this.username}:${this.password}`));
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      },
      data: {
        username: this.username,
        password: this.password
      },
      url: 'http://localhost:8080/api/login',
    }).then((data, textStatus, jqXHR) => console.log(data, textStatus, jqXHR, jqXHR.getResponseHeader('Set-Cookie')),
        error => console.log(error));

    // this.http.post('/api/login', {username: this.username, password: this.password}).subscribe((response) => Utils.showNotification("yay", 'success'));
  }
}
