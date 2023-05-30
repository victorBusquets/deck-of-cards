import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES, API_ROUTES_FRAGMENTS } from '@constants/api-routes.const';
import { DrawCardsResponseInterface } from '@interfaces/draw-cards-response.interface';
import { DeckResponseInterface } from '@interfaces/deck-response.interface';
import { PileListResponseInterface, PileResponseInterface } from '@interfaces/pile-response.interface';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private httpClient: HttpClient) {}

  generateDeck(deckCount: number = 1): Observable<DeckResponseInterface> {
    return this.httpClient.get<DeckResponseInterface>(API_ROUTES.generateDeck, {params: {deck_count: deckCount}});
  }

  drawCards(deckId: string, count: number): Observable<DrawCardsResponseInterface> {
    const drawCardsUrl: string = `${API_ROUTES.base}/${deckId}${API_ROUTES_FRAGMENTS.draw}`;

    return this.httpClient.get<DrawCardsResponseInterface>(drawCardsUrl, {params: {count}});
  }

  shuffle(deckId: string, remaining: boolean = false): Observable<DeckResponseInterface> {
    const shuffleUrl: string = `${API_ROUTES.base}/${deckId}${API_ROUTES_FRAGMENTS.shuffle}`;
    let params: {remaining?: boolean} = {};

    if (remaining) {
      params['remaining'] = remaining;
    }

    return this.httpClient.get<DeckResponseInterface>(shuffleUrl, {params});
  }

  addCardsToPile(deckId: string, pileName: string, cards: string[]): Observable<PileResponseInterface> {
    const addCardsUrl: string = `${API_ROUTES.base}/${deckId}${API_ROUTES_FRAGMENTS.pile}/${pileName}${API_ROUTES_FRAGMENTS.add}`;
    const formattedCards = cards.join(',');

    return this.httpClient.get<PileResponseInterface>(addCardsUrl, {params: {cards: formattedCards}});
  }

  getListPileCards(deckId: string, pileName: string): Observable<PileListResponseInterface> {
    const listPileUrl: string = `${API_ROUTES.base}/${deckId}${API_ROUTES_FRAGMENTS.pile}/${pileName}${API_ROUTES_FRAGMENTS.list}`;

    return this.httpClient.get<PileListResponseInterface>(listPileUrl, {});
  }
}
