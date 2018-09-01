import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Utils} from "../shared/utils";

@Component({
  selector: 'app-register',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {

  haslo= localStorage.haslo;
  login= localStorage.login;
  nazwa = localStorage.nazwa;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.http.post(`/api/setContest?contest_name=${this.nazwa}&contest_pass=${this.haslo}&login=${this.login}`,null).subscribe(
      res=>{
          Utils.showNotification('Utworzono gre', 'success')
      },
      error1 => {
        console.error(error1);
      }
    )
  }
}
