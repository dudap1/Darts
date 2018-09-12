import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Utils} from '../shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  imie;
  nazwisko;
  nazwa;
  password;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.http.post(`https://edarter2.herokuapp.com/api/setPlayer?name=${this.imie}&surname=${this.nazwisko}&login=${this.nazwa}&password=${this.password}`,null).subscribe(
      res=>{
          Utils.showNotification('Utworzono konto', 'success')
      },
      error1 => {
        console.error(error1);
      }
    )
  }
}
