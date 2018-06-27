import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Utils } from "../shared/utils";
import * as _ from "lodash";


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  zgloszenia = [];
  wolne = [];
  data;

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
  }

  goToShop(id) {
    this.router.navigate(['shop', id]);
  }

  removeNotif(id) {

  }

  save() {

  }
}
