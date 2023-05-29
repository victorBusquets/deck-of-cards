import { Component } from '@angular/core';
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

@Component({
  selector: 'app-guess-suit',
  templateUrl: './guess-suit.component.html',
  styleUrls: ['./guess-suit.component.scss']
})
export class GuessSuitComponent extends SubscriptionsBaseComponent {
  suitOptions: SuitOptionInterface[] = SUIT_OPTIONS;
  cardImage!: string;
  game!: GameModel;
  selectedCardSuit!: CardType | '';
  win: boolean = false;
  losse: boolean = false;
  cardVisible: boolean = false;
  pileNames: Record<string, string> = {
    wins: 'WINS',
    losses: 'LOSSES'
  };
  trackByIndex = TRACK_BY_INDEX_FUNCTION;
  private deckId!: string;

  constructor(
    private route: ActivatedRoute,
    private gameManagerService: GameManagerService,
    private deckService: DeckService
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

          if( this.selectedCardSuit === card.suit) {
            this.addGameResult(card.code, true);
          }else {
            this.addGameResult(card.code);
          }
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
        this.game.remainingCards = response.remaining;
        this.gameManagerService.updateGame(this.game);
        this.playAgain();
      });
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
