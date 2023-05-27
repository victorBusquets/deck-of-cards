import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list.component';
import { GameListRoutingModule } from './game-list-routing.module';



@NgModule({
  declarations: [
    GameListComponent
  ],
  imports: [
    GameListRoutingModule,
    CommonModule
  ]
})
export class GameListModule { }
