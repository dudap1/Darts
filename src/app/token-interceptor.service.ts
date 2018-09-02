import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Cookie } from "ng2-cookies";
import {HttpResponse} from 'selenium-webdriver/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    // let accessToken = Cookie.get('access_token');
    // if (accessToken) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${accessToken}`
    //     }
    //   });
    // }
    //
console.log(request);
request = request.clone({withCredentials: true});
    const obs = next.handle(request);


    // obs.subscribe(e => console.log(e));

    return obs;
    //
    // return next.handle(request).subscribe(event => {
    //   console.log(event);
    //
    //   return event;
    // });
    // return next.handle(request);
  }
}
