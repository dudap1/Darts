import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
//import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { LoginComponent } from "./login/login.component";
//import { ShopComponent } from "./shop/shop.component";
import {RegisterComponent} from "./register/register.component";
import {AddRoomComponent} from "./add-room/add-room.component";
import {RoomTableComponent} from "./room-table/room-table.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'map', component: DashboardComponent},
  //{path: 'user', component: UserProfileComponent},
//  {path: 'shop/:id', component: ShopComponent},
  //{path: 'shop', component: ShopComponent},
  //{path: 'admin', component: AdminPanelComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add-room', component: AddRoomComponent},
  {path: 'game-room', component: RoomTableComponent},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: []
})
export class AppRoutingModule {
}
