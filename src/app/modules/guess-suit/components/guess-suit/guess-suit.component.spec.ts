import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GuessSuitComponent } from './guess-suit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { GAME_OPTIONS } from '@constants/common.const';
import { GameModel } from '@models/game.class';
import { GameManagerService } from '@services/game-manager.service';
import { DeckService } from '@services/deck.service';
import { CARD_MOCK, DECK_MOCK_RESPONSE, DRAW_CARDS_MOCK_RESPONSE, ADD_CARDS_PILE_MOCK_RESPONSE } from '@constants/mocks/mock.const';
import { of } from 'rxjs';
import { NotificationService } from '@services/notifications.service';

describe('GuessSuitComponent', () => {
  let component: GuessSuitComponent;
  let fixture: ComponentFixture<GuessSuitComponent>;
  let gameManagerService: GameManagerService;
  let deckService: DeckService;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GuessSuitComponent, RouterTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(GuessSuitComponent);
    component = fixture.componentInstance;
    gameManagerService = TestBed.inject(GameManagerService);
    deckService = TestBed.inject(DeckService);
    notificationService = TestBed.inject(NotificationService);
    spyOn(gameManagerService, 'getGameDetail')
      .and.returnValue(new GameModel({type: GAME_OPTIONS['guessSuit'], wins: 1, losses: 1}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCards should set card info and gameResults', waitForAsync(()=>{
    const spy = spyOn<any>(component, 'addGameResult');
    spyOn(deckService, 'drawCards').and.returnValue(of(DRAW_CARDS_MOCK_RESPONSE));

    expect(component.cardVisible).toBeFalsy();
    component.getCard();

    expect(component.cardVisible ).toBeTruthy();
    expect(component.cardImage).toEqual(CARD_MOCK.image);
    expect(spy).toHaveBeenCalled();
  }));

  it('getCards with valid selectedOption should set win to true', ()=>{
    spyOn(deckService, 'drawCards').and.returnValue(of(DRAW_CARDS_MOCK_RESPONSE));
    spyOn(deckService, 'addCardsToPile').and.returnValue(of(ADD_CARDS_PILE_MOCK_RESPONSE));

    component.selectedCardSuit = 'HEARTS';
    component.getCard();
    expect(component.win).toBeTruthy();
  });

  it('getCards with valid selectedOption should set losse to true', ()=>{
    spyOn(deckService, 'drawCards').and.returnValue(of(DRAW_CARDS_MOCK_RESPONSE));
    spyOn(deckService, 'addCardsToPile').and.returnValue(of(ADD_CARDS_PILE_MOCK_RESPONSE));
    component.selectedCardSuit = 'DIAMONDS';
    component.getCard();
    expect(component.losse).toBeTruthy();
  });


  it('playAgain should clean params', ()=>{
    component.playAgain();
    expect(component.cardImage).toEqual('');
    expect(component.selectedCardSuit).toBeNull();
    expect(component.cardVisible).toBeFalsy();
    expect(component.win).toBeFalsy();
    expect(component.losse).toBeFalsy();
  });

  it('toggleSuit should toggle selected suit', ()=>{
    expect(component.selectedCardSuit).toBeNull();
    component.toggleSuit('CLUBS');
    expect(component.selectedCardSuit).toBe('CLUBS');
    component.toggleSuit('HEARTS');
    expect(component.selectedCardSuit).toBe('HEARTS');
    component.toggleSuit('HEARTS');
    expect(component.selectedCardSuit).toBeNull();
  });

  it('shuffleCards should clean game options and show notification', waitForAsync(()=>{
    const spy = spyOn(notificationService, 'addNotification');
    spyOn(deckService, 'shuffle').and.returnValue(of(DECK_MOCK_RESPONSE));
    component.game.wins = 1;
    component.game.losses = 1;

    component.shuffleCards();
    fixture.detectChanges();

    expect(component.game.wins).toEqual(0);
    expect(component.game.losses).toEqual(0);
    expect(spy).toHaveBeenCalled();
  }));

  it('closeModal should call previousCardsDialog.closeModal()', ()=>{
    const spy = spyOn(component.previousCardsDialog, 'closeModal');
    component.closeModal();

    expect(spy).toHaveBeenCalled();
  });
});
