import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionsBaseComponent } from '@components/subscriptions-base/subscriptions-base.component';
import { TRACK_BY_INDEX_FUNCTION } from '@constants/common.const';
import { GAME_TITLE } from '@constants/game-title.const';
import { GameModel } from '@models/game.class';
import { GameManagerService } from '@services/game-manager.service';
import { takeUntil } from 'rxjs';
import { GameType } from 'src/app/types/game.type';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent extends SubscriptionsBaseComponent {
  gameTitle: string = '';
  gameType!: GameType;
  games!: GameModel[];
  trackByIndex = TRACK_BY_INDEX_FUNCTION;

  constructor(
    private route: ActivatedRoute,
    private gameManagerService: GameManagerService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.gameType = params['gameType'];
      this.gameTitle = GAME_TITLE[this.gameType];
      this.getGames();
    });
  }

  deleteGame(event: Event, deckId: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.gameManagerService.deleteGame(deckId);
    this.getGames();
  }

  private getGames(): void {
    this.games = this.gameManagerService.getGameListByType(this.gameType);
  }
}
