import { Component, OnInit } from '@angular/core';
import { UserService } from "../../user.service";

declare const $: any;

export enum STYLE {
  FORALL, LOGGED_ONLY, LOGGED_OUT_ONLY
}

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  style: STYLE;
}

export const ROUTES: RouteInfo[] = [
//  {path: '/map', title: 'Mapa okolicy', icon: 'dashboard', class: '', style: STYLE.FORALL},
 // {path: '/shop', title: 'Sklep', icon: 'shopping_cart', class: '', style: STYLE.FORALL},
 // {path: '/admin', title: 'Panel administratora', icon: 'security', class: '', style: STYLE.LOGGED_ONLY},
  {path: '/login', title: 'Zaloguj', icon: 'person', class: '', style: STYLE.LOGGED_OUT_ONLY},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private UserService: UserService) {
    // UserService.eventEmitter.subscribe(bool => this.filter(bool));
  }

  ngOnInit() {
    this.menuItems = [
  //    {path: '/map', title: 'Mapa okolicy', icon: 'dashboard', class: '', style: STYLE.FORALL},
    //  {path: '/shop', title: 'Sklep', icon: 'shopping_cart', class: '', style: STYLE.FORALL},
     // {path: '/admin', title: 'Panel administratora', icon: 'security', class: '', style: STYLE.LOGGED_ONLY},
      {path: '/login', title: 'Zaloguj', icon: 'person', class: '', style: STYLE.LOGGED_OUT_ONLY},
      {path: '/register', title: 'Zarejestruj', icon: 'face', class: '', style: STYLE.LOGGED_OUT_ONLY},
      {path: '/add-room', title: 'Stworz gre', icon: 'videogame_asset', class: '', style: STYLE.LOGGED_OUT_ONLY},
    ];
  }

  filter(bool: boolean) {
    let style = bool ? STYLE.LOGGED_ONLY : STYLE.LOGGED_OUT_ONLY;
    this.menuItems = ROUTES.filter(m => m.style == STYLE.FORALL || m.style == style);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
