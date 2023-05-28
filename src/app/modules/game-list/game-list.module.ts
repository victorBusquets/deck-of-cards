import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list.component';
import { GameListRoutingModule } from './game-list-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GameListComponent
  ],
  imports: [
    GameListRoutingModule,
    RouterModule,
    CommonModule
  ]
})
export class GameListModule { }
