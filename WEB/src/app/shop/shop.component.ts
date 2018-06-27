import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { HttpClient } from "@angular/common/http";
import { Comment, Place } from "../shared/dtos";
import { Utils } from "../shared/utils";
import * as _ from "lodash";

declare const google: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  private paramSub: Subscription;
  shopId: number;

  creatingNew: boolean = false;

  types = [
    {value: 'Sklep', viewValue: 'Sklep'},
    {value: 'Restauracja', viewValue: 'Restauracja'},
    {value: 'Stacja', viewValue: 'Stacja'}
  ];

  zgloszenia = [];

  shopDetails: Place = {
    name: "",
    type: "",
    latitude: 0,
    longitude: 0,
    openingTime: "",
    closingTime: "",
    imageUrl: "",
    keywords: []
  };
  editedShopDetails: Place = Object.assign({}, this.shopDetails);

  editMode: boolean = this.creatingNew;
  customLocation: any;// = new google.maps.LatLng(52.3, 21);

  commentName: string = "";
  commentInput: string = "";
  comments: Comment[] = [];
  changeText: string = "";

  constructor(public UserService: UserService, private route: ActivatedRoute, private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.paramSub = this.route.params.subscribe(p => {
      this.shopId = +p['id'];
      this.loadShop(this.shopId);
    });
  }

  ngOnInit() {
    ;
  }

  loadShop(id: number) {
    if (!id) {
      this.creatingNew = true;
      this.editMode = true;
    } else {

    }
    if (id && this.UserService.loggedAsAdmin) {

    }
  }

  remove() {

  }

  enableEditMode() {
    this.editMode = true;
    this.editedShopDetails = Object.assign({}, this.shopDetails);
  }

  saveChanges() {
  }

  cancelEditMode() {
    this.editedShopDetails = null;
    this.editMode = false;
  }

  locationChanged(event: any): void {
    this.editedShopDetails.latitude = event.lat();
    this.editedShopDetails.longitude = event.lng();
  }

  selectedChips(event: any): void {
    this.editedShopDetails.keywords = event;
  }

  saveComment() {
    let c: Comment = {placeId: this.shopId, username: this.commentName, content: this.commentInput};


  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }

  sendChange() {
    let c: any = {placeId: this.shopId, reason: this.changeText};


  }

  removeNotif(id) {

  }

  removeComm(id) {

  }
}
