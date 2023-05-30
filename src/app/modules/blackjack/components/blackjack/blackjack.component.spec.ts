import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlackjackComponent } from './blackjack.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { GameModel } from '@models/game.class';
import { GameManagerService } from '@services/game-manager.service';
import { DeckService } from '@services/deck.service';
import { CARD_MOCK, DECK_MOCK_RESPONSE, DRAW_CARDS_MOCK_RESPONSE } from '@constants/mocks/mock.const';
import { of } from 'rxjs';
import { NotificationService } from '@services/notifications.service';

describe('BlackjackComponent', () => {
  let component: BlackjackComponent;
  let fixture: ComponentFixture<BlackjackComponent>;
  let gameManagerService: GameManagerService;
  let deckService: DeckService;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlackjackComponent, RouterTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(BlackjackComponent);
    component = fixture.componentInstance;
    deckService = TestBed.inject(DeckService);
    gameManagerService = TestBed.inject(GameManagerService);
    notificationService = TestBed.inject(NotificationService);
    spyOn(gameManagerService, 'getGameDetail').and.returnValue(new GameModel());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('play should set cards visibles and update score', waitForAsync(()=>{
    spyOn(deckService, 'drawCards').and.returnValue(of(DRAW_CARDS_MOCK_RESPONSE));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.playerCards[0].visible).toBeFalsy();

    component.play();
    fixture.detectChanges();
    expect(component.playerCards[0].visible).toBeTruthy();

    expect(component.score).toEqual(9);
  }));

  it('getOtherCard should add card and update score', waitForAsync(()=>{
    spyOn(deckService, 'drawCards').and.returnValue(of(DRAW_CARDS_MOCK_RESPONSE));
    component.playerCards = [CARD_MOCK];
    expect(component.playerCards.length).toEqual(1);

    component.getOtherCard();

    expect(component.playerCards.length).toEqual(2);
    expect(component.score).toEqual(18);
  }));

  it('playAgain should clean params and call startPlayerTurn', ()=>{
    const spy = spyOn<any>(component, 'startPlayerTurn');
    component.playAgain();
    expect(component.score).toEqual(0);
    expect(component.croupierScore).toEqual(0);
    expect(component.croupierTurn).toBeFalsy();
    expect(component.win).toBeFalsy();
    expect(component.losse).toBeFalsy();
    expect(component.gameStarted).toBeFalsy();
    expect(component.showLoading).toBeTruthy();
    expect(component.playerCards.length).toEqual(0);
    expect(component.croupierCards.length).toEqual(0);
    expect(spy).toHaveBeenCalled();
  });

  it('standUp should set croupierTurn', ()=>{
    spyOn(deckService, 'drawCards').and.returnValue(of(DRAW_CARDS_MOCK_RESPONSE));
    component.standUp();

    expect(component.croupierTurn).toBeTruthy();
  });

  it('shuffleCards should update remainingCards and show notification', waitForAsync(()=>{
    const spy = spyOn(notificationService, 'addNotification');
    spyOn(deckService, 'shuffle').and.returnValue(of(DECK_MOCK_RESPONSE));
    component.game.remainingCards = 0;

    expect(component.game.remainingCards).toEqual(0);
    component.shuffleCards();
    fixture.detectChanges();

    expect(component.game.remainingCards).toEqual(52);
    expect(spy).toHaveBeenCalled();
  }));
  
});
