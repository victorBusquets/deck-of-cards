import { Component } from '@angular/core';
import { GAME_LINKS } from './game-links.const';
import { TRACK_BY_INDEX_FUNCTION } from '@constants/common.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  gameLinks = GAME_LINKS;
  trackByIndex = TRACK_BY_INDEX_FUNCTION;
}
