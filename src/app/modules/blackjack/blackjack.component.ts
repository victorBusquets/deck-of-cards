import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsBaseComponent } from '@components/subscriptions-base/subscriptions-base.component';
import { MAX_SCORE, TRACK_BY_INDEX_FUNCTION } from '@constants/common.const';
import { ACE, CARD_VALUES, MIN_BLACKJACK_CARDS } from '@constants/game-options.const';
import { CardInterface } from '@interfaces/card.interface';
import { DrawCardsResponseInterface } from '@interfaces/draw-cards-response.interface';
import { GameModel } from '@models/game.class';
import { DeckService } from '@services/deck.service';
import { GameManagerService } from '@services/game-manager.service';
import { NotificationService } from '@services/notifications.service';
import { Observable, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent extends SubscriptionsBaseComponent {
  game!: GameModel;
  score: number = 0;
  playerCards: CardInterface[] = [];
  losse: boolean = false;
  win: boolean = false;
  gameStarted: boolean = false;
  croupierTurn: boolean = false;
  showLoading: boolean = false;
  buttonLoading: boolean = false;
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
        this.getInitialCards();
      });
  }

  getInitialCards(): void {
    this.showLoading = true;
    this.getCards(2).subscribe({
      next: response => {
        this.showLoading = false;
        this.playerCards = this.formatCardsResponse(response.cards);
      },
      error: ()=>{
        this.showLoading = false;
      }
    });
  }

  play(): void {
    this.gameStarted = true;
    this.playerCards.forEach((card)=>card.visible = true);
    this.updateScore();
  }

  getOtherCard(): void {
    this.buttonLoading = true;
    this.getCards(1).subscribe({
      next: response => {
        this.buttonLoading = false;
        this.playerCards = this.playerCards.concat(this.formatCardsResponse(response.cards, true));
        this.updateScore();
      },
      error: ()=>{
        this.buttonLoading = false;
      }
    });
  }

  standUp(): void {
    this.croupierTurn = true;
  }

  playAgain(): void {
    this.croupierTurn = false;
    this.win = false;
    this.losse = false;
    this.gameStarted = false;
    this.showLoading = true;
    this.playerCards = [];

    this.getInitialCards();
  }

  shuffleCards(): void {
    this.deckService.shuffle(this.deckId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response)=>{
        this.notificationService.addNotification('success', 'Cartas barajadas');
        this.game.remainingCards = response.remaining;
        this.gameManagerService.updateGame(this.game);
      });
  }

  private updateScore(): void {
    const cardValues: string[] = this.playerCards.map((card)=>card.value);
    const cardWithoutAces: string[] = cardValues.filter((value)=>value !== ACE); 
    const numberOfAces: number = cardValues.length - cardWithoutAces.length;

    this.score = cardWithoutAces
      .map((value) => CARD_VALUES[value] || +value)
      .reduce((a,b) => a+b);

    this.score = this.addAcesValue(this.score, numberOfAces);
    this.checkGameEnd();
  }

  private addAcesValue(score: number, numberOfAces: number): number {
    const bigAceScore: number = score + CARD_VALUES['BIG-ACE']  + numberOfAces -1;
    const bigAceIsValid: boolean = bigAceScore <= MAX_SCORE;
    
    return bigAceIsValid && numberOfAces ? this.addBigAce(score, numberOfAces) : score + numberOfAces;
  }

  private addBigAce(score: number, numberOfAces: number): number {
    const newScore: number = score + CARD_VALUES['BIG-ACE'];
    return numberOfAces > 1 ? this.addAcesValue(newScore, numberOfAces-1) : newScore;
  }

  private checkGameEnd(): void {
    if (this.score === MAX_SCORE) {
      this.win = true;
      this.updateGame();
    } else if (this.score > MAX_SCORE) {
      this.losse = true;
      this.updateGame();
    }
  }

  private formatCardsResponse(cards: CardInterface[], setVisible: boolean = false): CardInterface[] {
    return cards.map((card)=>{
      card.visible = setVisible;
      return card;
    });
  }

  private getCards(count: number): Observable<DrawCardsResponseInterface> {
    return this.deckService
      .drawCards(this.deckId, count)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(()=>this.updateGame(count))
      );
  }

  private updateGame(drawedCards: number = 0): void {
    this.game.wins += this.win ? 1 : 0;
    this.game.losses += this.losse ? 1 : 0;
    this.game.remainingCards -= drawedCards;
    this.gameManagerService.updateGame(this.game);

    if(!drawedCards && this.game.remainingCards < MIN_BLACKJACK_CARDS) {
      this.shuffleCards();
    }
  }
}
