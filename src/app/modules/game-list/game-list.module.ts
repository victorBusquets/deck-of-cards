import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list.component';
import { GameListRoutingModule } from './game-list-routing.module';
import { RouterModule } from '@angular/router';
import { DialogComponent } from '@components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GameListComponent
  ],
  imports: [
    GameListRoutingModule,
    RouterModule,
    CommonModule,
    DialogComponent,
    FormsModule
  ]
})
export class GameListModule { }
