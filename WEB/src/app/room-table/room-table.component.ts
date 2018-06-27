import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.scss']
})
export class RoomTableComponent implements OnInit {

  //w momoencie wejscia do pokoju trzeba wsadzic id tego pokoju do localStorage.roomId

  roomId = localStorage.roomId-0;

  nowaKolejka = [];


  displayData = [];

  liczbaRund = [];

  constructor(private http: HttpClient) { }

  refreshData(){
    //TODO pobranie na nowo danych z DB
    // pobranie z BD wszystkich danych z pokoju tj
    // wszystkich graczy i wszystkie rundy (!posortowane)
    // struktura:
    // [
    //  {name: nazwa_gracza, id: 0, rounds: [
    //    {amount, full_amount, id}
    //   ]}
    // ]

    this.displayData = [
      {
        name: 'Patryk', id:0,
        rounds: [
          {amount: 5, full_amount: 5, id: 1},
          {amount: 5, full_amount: 10, id: 3},
          {amount: 5, full_amount: 15, id: 5},
          {amount: 5, full_amount: 20, id: 9},
          {amount: 5, full_amount: 25, id: 99}
        ]
      },
      {
        name: 'Adi', id:1,
        rounds: [
          {amount: 5, full_amount: 5, id: 786},
          {amount: 5, full_amount: 10, id: 567856},
          {amount: 5, full_amount: 15, id: 476456},
          {amount: 5, full_amount: 20, id: 3456},
          {amount: 5, full_amount: 25, id: 12341}
        ]
      },
      {
        name: 'DK', id:2,
        rounds: [
          {amount: 20, full_amount: 20, id: 5432543},
          {amount: 15, full_amount: 35, id: 234632},
          {amount: 10, full_amount: 45, id: 432513},
          {amount: 5, full_amount: 50, id: 123416},
          {amount: 15, full_amount: 65, id: 63141}
        ]
      }
    ];

    this.nowaKolejka = [];
    for(let i = 0; i < this.displayData.length; i++){
      this.nowaKolejka.push({
        id: this.displayData[i].id,
        pkt: null
      })
    }

    this.liczbaRund = [];
    for(let i = 0; i < this.displayData.length; i++){
      this.liczbaRund = this.liczbaRund.length < this.displayData[i].rounds.length ? this.displayData[i].rounds : this.liczbaRund;
    }
  }

    dodajKolejke(){
      for(let i = 0; i < this.nowaKolejka.length - 1 ; i++){
        this.http.post(`/api/setRound?amount=${this.nowaKolejka[i].pkt}&photoPath=&contest=${this.roomId}&player=${this.nowaKolejka[i].id}`,null).subscribe(
          res=>{
            this.refreshData();
          },
          err=>{
            alert(err);
            console.error(err);
          }
        )
      }
    }

  update(id, nowailosc, roomId, idgracza){
    this.http.post(`/api/updateRound?id=${id}&amount=${nowailosc}&contest=${roomId}&player=${idgracza}`, null).subscribe(
      res=>{this.refreshData();},
      err=>{alert(err);console.log(err);})
  }

  usunKolejke(){
    let id = this.displayData[0].rounds[this.displayData[0].rounds.length - 1].id
    this.http.post(`/api/deleteRound?id=${id}`, null).subscribe(
      res=>{
        this.refreshData();
      },
      err=>{
        alert(err);
        console.error(err);
      }
    )
  }

  ngOnInit() {
    this.refreshData();
  }

}
