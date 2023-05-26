import { Component } from '@angular/core';
import { GameManagerService } from '@services/game-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private gameManagerService: GameManagerService) {
    console.log(this.gameManagerService)
  }
}
