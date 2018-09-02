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
  nazwa = localStorage.nazwa;


  constructor(private http: HttpClient, private UserService: UserService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.http.post(`https://edarter2.herokuapp.com/api/setContest?contest_name=${this.nazwa}&contest_pass=${this.haslo}&login=${this.UserService._login}`,null).subscribe(
      (res:any ) => {
          localStorage.nazwa = this.nazwa;
          localStorage.haslo = this.haslo;
          Utils.showNotification('Utworzono gre', 'success')
          this.router.navigate(['/game-room', res.id]);
      },
      error1 => {
        console.error(error1);
      }
    )
  }
}
