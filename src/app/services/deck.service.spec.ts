import { TestBed } from '@angular/core/testing';

import { DeckService } from './deck.service';
import { API_ROUTES, API_ROUTES_FRAGMENTS } from '@constants/api-routes.const';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ADD_CARDS_PILE_MOCK_RESPONSE, DECK_MOCK_RESPONSE, DRAW_CARDS_MOCK_RESPONSE, GET_CARDS_PILE_MOCK_RESPONSE } from '@constants/mocks/mock.const';

describe('DeckService', () => {
  let deckService: DeckService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpController = TestBed.inject(HttpTestingController);
    deckService = TestBed.inject(DeckService);
  });

  it('should be created', () => {
    expect(deckService).toBeTruthy();
  });
  
  it('should call generateDeck', () => {
    const numberOfDecks: number = 1;
    deckService.generateDeck(numberOfDecks).subscribe((res) => {
      expect(res).toEqual(DECK_MOCK_RESPONSE);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_ROUTES.generateDeck}?deck_count=${numberOfDecks}`
    });

    req.flush(DECK_MOCK_RESPONSE);
  });

  it('should call drawCards', () => {
    const deckId: string = 'aaa';
    const numberOfCards: number = 1;

    deckService.drawCards(deckId, numberOfCards).subscribe((res) => {
      expect(res).toEqual(DRAW_CARDS_MOCK_RESPONSE);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_ROUTES.base}/${deckId}${API_ROUTES_FRAGMENTS.draw}?count=${numberOfCards}`
    });

    req.flush(DRAW_CARDS_MOCK_RESPONSE);
  });

  it('should call shuffle', () => {
    const deckId: string = 'aaa';

    deckService.shuffle(deckId).subscribe((res) => {
      expect(res).toEqual(DECK_MOCK_RESPONSE);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_ROUTES.base}/${deckId}${API_ROUTES_FRAGMENTS.shuffle}`
    });

    req.flush(DECK_MOCK_RESPONSE);
  });
  
  it('should call shuffle with remainings', () => {
    const deckId: string = 'aaa';
    const shuffleRemainings: boolean = true;

    deckService.shuffle(deckId, shuffleRemainings).subscribe((res) => {
      expect(res).toEqual(DECK_MOCK_RESPONSE);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_ROUTES.base}/${deckId}${API_ROUTES_FRAGMENTS.shuffle}?remaining=${shuffleRemainings}`
    });

    req.flush(DECK_MOCK_RESPONSE);
  });

  it('should call addCardsToPile', () => {
    const deckId: string = 'aaa';
    const pileName: string = 'pilename';
    const cards: string[] = ['8H'];

    deckService.addCardsToPile(deckId, pileName, cards).subscribe((res) => {
      expect(res).toEqual(ADD_CARDS_PILE_MOCK_RESPONSE);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_ROUTES.base}/${deckId}${API_ROUTES_FRAGMENTS.pile}/${pileName}${API_ROUTES_FRAGMENTS.add}?cards=${cards.join(',')}`
    });

    req.flush(ADD_CARDS_PILE_MOCK_RESPONSE);
  });

  it('should call getListPileCards', () => {
    const deckId: string = 'aaa';
    const pileName: string = 'pilename';
    const cards: string[] = ['8H'];

    deckService.getListPileCards(deckId, pileName).subscribe((res) => {
      expect(res).toEqual(GET_CARDS_PILE_MOCK_RESPONSE);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_ROUTES.base}/${deckId}${API_ROUTES_FRAGMENTS.pile}/${pileName}${API_ROUTES_FRAGMENTS.list}`
    });

    req.flush(GET_CARDS_PILE_MOCK_RESPONSE);
  });
});
