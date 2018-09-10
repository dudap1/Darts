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
players=[];
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


  handleResult(result: Array<RecordResult>) {

    let displayData = []
    /*lista graczy*/
    let players = [];
    result.forEach(element => {
      if (players.indexOf(element.login) == -1) {
        players.push(element.login);
       // displayData[players.indexOf(element.login)] = [];
      }
    });
    this.players = players;

    /*preparowanie rekordów kolejek*/
    /*displayData powinno wygladac jakos tak*/
    /*[
        [RecordResult,RecordResult,RecordResult...],
        [RecordResult,RecordResult...],
        [RecordResult,RecordResult...]
    ]*/
    /*jak jest zaczecie meczykow to powinno wygladac tak*/
    /*[
        [RecordResult],
        [null],
        [null]
    ]*/
    let temp_dis_data: Array<Array<RecordResult>> = [];
    result.forEach(element => {
      temp_dis_data[this.players.indexOf(element.login)]
        .push(element.id == null ? null : element);
    })
    temp_dis_data.forEach((player, playerIndex) => {
      player.forEach((element, index) => {
        if (!displayData[index]) {
          displayData[index] = [];
        }
        displayData[index][playerIndex] = element;
      })
    })
    this.displayData = displayData;


    /* to jest na koncu do wpisania nowej kolejki */
    this.newQueue = [];
    this.players.forEach((element, i) => {
      this.newQueue[i] = result[i];
    })

    // for (let i = 0; i < this.displayData.length; i++) {
    //     this.newQueue.push({
    //         id: this.displayData[i].id,
    //         amount: null
    //     })
    // }

    /*ustawienie najdłuższej kolejki*/
    this.countRounds = [];
    for (let i = 0; i < this.displayData.length; i++) {
      if (this.countRounds.length < this.displayData[i].length) {
        this.countRounds = this.displayData[i];
      }
    }

  }

  refreshData() {

    this.http.post(`https://edarter2.herokuapp.com/api/getRoundsByName?contestName=${this.name}&login=${this.UserService._login}`,null)
      .subscribe((res:Array<RecordResult> )=> {

        console.log(res);
  this.displayData  = res;
  this.handleResult(res);
        },
        error => {
          console.error(error);
        })

/*
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
*/
  }

  addQueue() {
    for (let i = 0; i < this.newQueue.length - 1; i++) {
      this.http.post(`https://edarter2.herokuapp.com/api/setRound?amount=${this.newQueue[i].pkt}&photoPath=&contest=${this.roomId}&player=${this.newQueue[i].id}`, null).subscribe(
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
    this.http.post(`https://edarter2.herokuapp.com/api/updateRound?id=${id}&amount=${nowailosc}&contest=${roomId}&player=${idgracza}`, null).subscribe(
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
    this.http.post(`https://edarter2.herokuapp.com/api/deleteRound?id=${id}`, null).subscribe(
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
    this.http.post(`https://edarter2.herokuapp.com/api/joinContest?contest_name=${this.name}&contest_pass=${this.password}&login=${this.login}`, null).subscribe(
      res => {
        Utils.showNotification('Dodano gracza', 'success')
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

class RecordResult {
  id: number;
  amount: number;
  fullAmount: number;
  photoPath: string;
  login: string;
}
