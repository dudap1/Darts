import { Component } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Location, PopStateEvent } from "@angular/common";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(public location: Location, private router: Router, private service: UserService, private http: HttpClient) {

  }

  ngOnInit() {
    setTimeout(() => {
      //console.clear();
      console.log("" +
        " .d8888b.    888                      888    \n" +
        "d88P  Y88b   888                      888    Ta funkcja przeglądarki jest przeznaczona \n" +
        "Y88b.        888                      888    dla twórców aplikacji. Jeśli ktoś polecił \n" +
        " 'Y888b.   8888888  .d88b.  88888b.   888    Ci skopiować i wkleić tu coś, aby włączyć \n" +
        "    'Y88b.   888   d88''88b 888 '88b  888    ukrytą funkcję strony lub zhackować jakiś\n" +
        "      '888   888   888  888 888  888  Y8P    element - jest to oszustwo mające na celu\n" +
        "Y88b  d88P   888   Y88..88P 888 d88P         uzyskanie dostępu do twojego konta.\n" +
        " 'Y8888P'    888    'Y88P'  88888P'   888    \n" +
        "                            888              \n" +
        "                            888              \n" +
        "                            888              \n")}, 1000);
    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this._router = this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        elemMainPanel.scrollTop = 0;
        elemSidebar.scrollTop = 0;
      });
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
