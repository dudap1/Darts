import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Utils} from '../shared/utils';
import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';

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
  players = [];
  countRounds = [];
  lastRecordsIndex = [];
  lastRecords = [];

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

    const displayData = []
    /*lista graczy*/
    const players = [];
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
    const temp_dis_data: Array<Array<RecordResult>> = [];
    result.forEach(element => {
      const index = players.indexOf(element.login);
      if (!temp_dis_data[index]) {
        temp_dis_data[index] = [];
      }
      temp_dis_data[index].push(element.id == null ? null : element);
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

    /* to jest by wiedziec czy mamy do czynienia z ostatnim rekordem gracza (do ewentualnej poprawy) */
    this.lastRecordsIndex = []
    temp_dis_data.forEach((player, playerIndex) => {
      this.lastRecordsIndex[playerIndex] = player.length;
    })
    this.lastRecords = [];
    temp_dis_data.forEach((player, playerIndex) => {
      this.lastRecords[playerIndex] = player[player.length - 1];
    })


    /* to jest na koncu do wpisania nowej kolejki */
    this.newQueue = [];
    this.players.forEach(
      (element, i) => {
        this.newQueue[i] = <RecordResult>{amount: 0, login: element};
      }
    )

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

    this.http.post(`https://edarter2.herokuapp.com/api/getRoundsByName?contestName=${this.name}&login=${this.UserService._login}`, null)
      .subscribe((res: Array<RecordResult>) => {

          console.log(res);
          this.displayData = res;
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
      this.http.post(`https://edarter2.herokuapp.com/api/setRound?amount=${this.newQueue[i].amount}&contest=${name}&player=${this.newQueue[i].login}`, null).subscribe(
        res => {
          console.log('dodano rekord');
          console.log(res)
        },
        err => {
          alert(err);
          console.error(err);
        }
      )
    }
    setTimeout(() => {
      this.refreshData()
    }, 1000)
  }

  update(id, nowailosc, roomId, idgracza) {
    this.http.post(`https://edarter2.herokuapp.com/api/updateRound?id=${id}&amount=${nowailosc}&contest=${roomId}&player=${idgracza}`,
      null).subscribe(
      res => {
        this.refreshData();
      },
      err => {
        alert(err);
        console.log(err);
      })
  }

  deleteQueue(j) {
    if (this.displayData[j]) {
      this.displayData[j].forEach(el => {
        if (el.id) {
          this.http.post(`https://edarter2.herokuapp.com/api/deleteRound?id=${el.id}`, null).subscribe(
            res => {
              console.log('rekord usunieto');
              console.log(res);
            },
            err => {
              alert(err);
              console.error(err);
            }
          )
        }
      });
    }
    setTimeout((el) => {
      this.refreshData();
    }, 1000)
  }

  joinMatch() {
    this.http
      .post(
        `https://edarter2.herokuapp.com/api/joinContest?contest_name=${this.name}&contest_pass=${this.password}&login=${this.login}`,
        null)
      .subscribe(
        res => {
          Utils.showNotification('Dodano gracza', 'success');
          this.refreshData();
        },
        error1 => {
          console.error(error1);
        }
      )
  }

  ngOnInit() {
    this.refreshData();
    setInterval(() => {
      if (localStorage.debug) {
        console.log(this);
        console.log(this.newQueue)
      }
    }, 2000)
  }

}

class RecordResult {
  id: number;
  amount: number;
  fullAmount: number;
  photoPath: string;
  login: string;
}
