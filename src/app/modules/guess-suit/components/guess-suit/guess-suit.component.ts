import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { SubscriptionsBaseComponent } from '@components/subscriptions-base/subscriptions-base.component';
import { GameManagerService } from '@services/game-manager.service';
import { GameModel } from '@models/game.class';
import { DeckService } from '@services/deck.service';
import { CardInterface } from '@interfaces/card.interface';
import { CardType } from 'src/app/types/card.type';
import { SuitOptionInterface } from '../../suit-option.interface';
import { SUIT_OPTIONS } from '../../suit-options.const';
import { TRACK_BY_INDEX_FUNCTION } from '@constants/common.const';
import { DialogComponent } from '@components/dialog/dialog.component';
import { NotificationService } from '@services/notifications.service';

@Component({
  selector: 'app-guess-suit',
  templateUrl: './guess-suit.component.html',
  styleUrls: ['./guess-suit.component.scss']
})
export class GuessSuitComponent extends SubscriptionsBaseComponent {
  @ViewChild('previousCardsDialog', { static: true }) previousCardsDialog!: DialogComponent;
  suitOptions: SuitOptionInterface[] = SUIT_OPTIONS;
  cardImage!: string;
  game!: GameModel;
  selectedCardSuit!: CardType | '';
  win: boolean = false;
  losse: boolean = false;
  cardVisible: boolean = false;
  previousCards: CardInterface[] = [];
  selectedPileName: string = '';
  pileNames: Record<string, string> = {
    wins: 'wins',
    losses: 'losses'
  };
  showLoading: boolean = false;
  trackByIndex = TRACK_BY_INDEX_FUNCTION;
  private deckId!: string;

  constructor(
    private route: ActivatedRoute,
    private gameManagerService: GameManagerService,
    private deckService: DeckService,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.deckId = params['deckId'];
        this.game = this.gameManagerService.getGameDetail(this.deckId) as GameModel; 
      });
  }

  getCard(): void {
    if(!this.cardImage) {
      this.deckService.drawCards(this.deckId, 1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(response => {
          const card: CardInterface = response.cards[0];
          this.cardImage = card.image;
          this.cardVisible = true;
          this.addGameResult(card.code, this.selectedCardSuit === card.suit);
        });
    }
  }

  playAgain(): void {
    this.cardImage = '';
    this.selectedCardSuit = '';
    this.cardVisible = false;
    this.win = false;
    this.losse = false;
  }

  toggleSuit(suit: CardType): void {
    if(!this.cardImage) {
      this.selectedCardSuit = this.selectedCardSuit === suit ? '' : suit;
    }
  }

  shuffleCards(): void {
    this.deckService.shuffle(this.deckId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response)=>{
        this.game.losses = 0;
        this.game.wins = 0;
        this.game.remainingCards = response.remaining;
        this.gameManagerService.updateGame(this.game);
        this.notificationService.addNotification('success', 'Cartas barajadas');
        this.playAgain();
      });
  }

  showModal(pileName: string): void{
    this.previousCardsDialog.showModal();
    this.selectedPileName = pileName;
    this.showLoading = true;
    
    this.deckService.getListPileCards(this.deckId, pileName)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response)=>{
          this.showLoading = false;
          this.previousCards = response.piles[pileName].cards;
        },
        error: ()=> {
          this.showLoading = false;
        }
      });
  }

  closeModal(): void {
    this.previousCardsDialog.closeModal();
    this.selectedPileName = '';
    this.previousCards = [];
  }

  private addGameResult(card: string, win: boolean = false): void {
    const pileName: string = win ? this.pileNames['wins'] : this.pileNames['losses'];
    this.win = win;
    this.losse = !win;

    this.deckService.addCardsToPile(this.deckId, pileName, [card])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response)=>{
        this.game.wins += this.win ? 1 : 0;
        this.game.losses += this.losse ? 1 : 0;
        this.game.remainingCards = response.remaining;
        this.gameManagerService.updateGame(this.game);
        
        if(this.game.remainingCards  === 0) {
          this.shuffleCards();
        }
      });
  }
}
