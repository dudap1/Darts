import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Utils} from '../shared/utils';
import {UserService} from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.scss']
})
export class RoomTableComponent implements OnInit {


  roomId = null;

  newQueue = [];
  sub = null;

  displayData = [];

  countRounds = [];

  password = localStorage.password;
  login = localStorage.login;
  name = localStorage.name;

  constructor(private http: HttpClient, private route: ActivatedRoute, private UserService: UserService) {
    this.sub = this.route.params.subscribe(params => {
      this.roomId = params['id'];
    });
  }

  create() {

  }

  refreshData() {

    this.http.post('https://edarter2.herokuapp.com/api/getRoundsByName', {contestName: this.name, login: this.UserService._login})
      .subscribe((res:Array<any> )=> {
        console.log(res);
  this.displayData  = res;
        },
        error => {
          console.error(error);
        })


    this.newQueue = [];
    for (let i = 0; i < this.displayData.length; i++) {
      this.newQueue.push({
        id: this.displayData[i].id,
        pkt: null
      })
    }

    this.countRounds = [];
    for (let i = 0; i < this.displayData.length; i++) {
      this.countRounds = this.countRounds.length < this.displayData[i].rounds.length ? this.displayData[i].rounds : this.countRounds;
    }
  }

  addQueue() {
    for (let i = 0; i < this.newQueue.length - 1; i++) {
      this.http.post(`https://edarter2.herokuapp.com/api/api/setRound?amount=${this.newQueue[i].pkt}&photoPath=&contest=${this.roomId}&player=${this.newQueue[i].id}`, null).subscribe(
        res => {
          this.refreshData();
        },
        err => {
          alert(err);
          console.error(err);
        }
      )
    }
  }

  update(id, nowailosc, roomId, idgracza) {
    this.http.post(`https://edarter2.herokuapp.com/api/api/updateRound?id=${id}&amount=${nowailosc}&contest=${roomId}&player=${idgracza}`, null).subscribe(
      res => {
        this.refreshData();
      },
      err => {
        alert(err);
        console.log(err);
      })
  }

  deleteQueue() {
    const id = this.displayData[0].rounds[this.displayData[0].rounds.length - 1].id
    this.http.post(`https://edarter2.herokuapp.com/api/api/deleteRound?id=${id}`, null).subscribe(
      res => {
        this.refreshData();
      },
      err => {
        alert(err);
        console.error(err);
      }
    )
  }

  joinMatch() {
    this.http.post(`https://edarter2.herokuapp.com/api/api/joinMatch?contest_name=${this.name}&contest_pass=${this.password}&login=${this.login}`, null).subscribe(
      res => {
        Utils.showNotification('Utworzono konto', 'success')
      },
      error1 => {
        console.error(error1);
      }
    )
  }

  ngOnInit() {
    this.refreshData();
  }

}
