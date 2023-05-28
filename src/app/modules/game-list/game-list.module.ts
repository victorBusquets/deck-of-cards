import { NgModule } from '@angular/core';
import { GameListRoutingModule } from './game-list-routing.module';
import { GameListComponent } from './components/game-list/game-list.component';

@NgModule({
  imports: [
    GameListRoutingModule,
    GameListComponent,
  ]
})
export class GameListModule { }
