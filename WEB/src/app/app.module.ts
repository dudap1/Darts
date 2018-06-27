import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  MatButtonModule, MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule, MatOptionModule,
  MatRippleModule, MatSelectModule,
  MatTooltipModule,
  MAT_DATE_LOCALE,
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { UserService } from "app/user.service";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MapsComponent } from "./maps/maps.component";
import { CommonModule } from "@angular/common";
import { TokenInterceptorService } from "./token-interceptor.service";
import { AboutUsComponent } from './about-us/about-us.component';
import {RegisterComponent} from "./register/register.component";
import {AddRoomComponent} from "./add-room/add-room.component";
import { RoomTableComponent } from './room-table/room-table.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    HttpClientModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ComponentsModule,
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatTooltipModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD5C3W7LjfDmeFUeVXKsjazi3xmVx-_h7g'
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    MapsComponent,
    AdminPanelComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    AboutUsComponent,
    AddRoomComponent,
    RoomTableComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
