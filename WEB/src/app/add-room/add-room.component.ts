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

  imie;
  nazwisko;
  nazwa = localStorage.nazwa;
  password;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.http.post(`/api/setPlayer?name=${this.imie}&surname=${this.nazwisko}&login=${this.nazwa}&password=${this.password}`,null).subscribe(
      res=>{
          Utils.showNotification('Utworzono konto', 'success')
      },
      error1 => {
        console.error(error1);
      }
    )
  }
}
