import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '@components/dialog/dialog.component';
import { SubscriptionsBaseComponent } from '@components/subscriptions-base/subscriptions-base.component';
import { TRACK_BY_INDEX_FUNCTION } from '@constants/common.const';
import { GAME_NUMBER_OF_DECKS } from '@constants/game-options.const';
import { GAME_TITLE } from '@constants/game-title.const';
import { GameModel } from '@models/game.class';
import { DeckService } from '@services/deck.service';
import { GameManagerService } from '@services/game-manager.service';
import { takeUntil } from 'rxjs';
import { GameType } from 'src/app/types/game.type';
import { GameItemComponent } from '../game-item/game-item.component';
import { SpinnerDirective } from '@directives/spinner/spinner.directive';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    FormsModule,
    GameItemComponent,
    SpinnerDirective
  ],
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent extends SubscriptionsBaseComponent {
  @ViewChild('createGameDialog', { static: true }) createGameDialog!: DialogComponent;
  @ViewChild('confirmDeleteDialog', { static: true }) confirmDeleteDialog!: DialogComponent;
  gameTitle: string = '';
  gameType!: GameType;
  games!: GameModel[];
  gameName: string = '';
  loading: boolean = false;
  deletedGame!: GameModel | null;
  trackByIndex = TRACK_BY_INDEX_FUNCTION;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameManagerService: GameManagerService,
    private deckService: DeckService
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

  deleteGame(): void {
    const deckId: string = this.deletedGame?.deckId as string;
    this.gameManagerService.deleteGame(deckId);
    this.closeDeleteModal();
    this.getGames();
  }

  closeModal(): void {
    this.gameName = '';
    this.createGameDialog.closeModal();
  }

  showModal(): void {
    this.createGameDialog.showModal();
  }

  closeDeleteModal(): void {
    this.deletedGame = null;
    this.confirmDeleteDialog.closeModal();
  }

  showDeleteModal(game: GameModel): void {
    this.deletedGame = game;
    this.confirmDeleteDialog.showModal();
  }

  createGame(): void {
    const numberOfDecks: number = GAME_NUMBER_OF_DECKS[this.gameType];
    this.loading = true;

    this.deckService.generateDeck(numberOfDecks)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (deck)=>{
          const game: GameModel = this.gameManagerService
            .createGame(deck.deck_id, this.gameName, this.gameType, deck.remaining);
          this.loading = false;
          this.closeModal();
          this.goToGameDetail(game);
        },
        error: ()=> {
          this.loading = false;
        }
      });
  }

  private goToGameDetail(game: GameModel): void {
    this.router.navigate(['/', game.type, game.deckId]);
  }

  private getGames(): void {
    this.games = this.gameManagerService.getGameListByType(this.gameType);
  }
}
