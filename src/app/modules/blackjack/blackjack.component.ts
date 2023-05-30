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
import { BlackjackUtils } from '@utils/blackjack.utils';
import { Observable, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent extends SubscriptionsBaseComponent {
  game!: GameModel;
  score: number = 0;
  croupierScore: number = 0;
  playerCards: CardInterface[] = [];
  croupierCards: CardInterface[] = [];
  losse: boolean = false;
  win: boolean = false;
  gameStarted: boolean = false;
  croupierTurn: boolean = false;
  showCroupierLoading: boolean = false;
  showLoading: boolean = false;
  buttonLoading: boolean = false;
  trackByIndex = TRACK_BY_INDEX_FUNCTION;
  private deckId!: string;

  constructor(
    private route: ActivatedRoute,
    private gameManagerService: GameManagerService,
    private deckService: DeckService,
    private notificationService: NotificationService,
    private blackjackUtils: BlackjackUtils
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
    this.startCroupierTurn();
  }

  playAgain(): void {
    this.score = 0;
    this.croupierScore = 0;
    this.croupierTurn = false;
    this.win = false;
    this.losse = false;
    this.gameStarted = false;
    this.showLoading = true;
    this.playerCards = [];
    this.croupierCards = [];

    this.getInitialCards();
  }

  shuffleCards(startNewGame: boolean = false): void {
    this.deckService.shuffle(this.deckId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response)=>{
        this.notificationService.addNotification('success', 'Cartas barajadas');
        this.game.remainingCards = response.remaining;
        this.gameManagerService.updateGame(this.game);

        if(startNewGame) {
          this.playAgain();
        }
      });
  }

  private startCroupierTurn(): void {
    this.showCroupierLoading = true;

    this.getCards(2).subscribe({
      next: response => {
        this.showCroupierLoading = false;
        this.croupierCards = this.formatCardsResponse(response.cards, true);
        this.updateCroupierScore();
      },
      error: ()=>{
        this.showCroupierLoading = false;
      }
    });
  }

  private croupierGetOtherCard(): void {
    this.getCards(1).subscribe(response => {
      this.croupierCards = this.croupierCards.concat(this.formatCardsResponse(response.cards, true));
      this.updateCroupierScore();
    });
  }

  private updateCroupierScore(): void {
    this.croupierScore = this.blackjackUtils.getScore(this.croupierCards);
    this.checkCroupierGameEnd();
  }

  private updateScore(): void {
    this.score = this.blackjackUtils.getScore(this.playerCards);
    this.checkGameEnd();
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

  private checkCroupierGameEnd(): void {
    if (this.croupierScore >= 17) {
      this.win = this.score > this.croupierScore || this.croupierScore > MAX_SCORE;
      this.losse = !this.win;
      this.updateGame();
    } else {
      setTimeout(()=> this.croupierGetOtherCard(), 1000);
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
