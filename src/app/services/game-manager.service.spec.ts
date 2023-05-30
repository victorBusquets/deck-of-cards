import { TestBed } from '@angular/core/testing';
import { GameManagerService } from './game-manager.service';
import { GameModel } from '@models/game.class';
import { GameType } from '../types/game.type';
import { GAME_OPTIONS } from '@constants/common.const';

describe('GameManagerService', () => {
  let gameManagerService: GameManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    gameManagerService = TestBed.inject(GameManagerService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(gameManagerService).toBeTruthy();
  });

  it('createGame should return new game', () => {
    const deckId: string = 'aaa';
    const name: string = 'Name';
    const type: GameType = GAME_OPTIONS['blackjack'];
    const remainingCards: number = 52;

    const newGame: GameModel = gameManagerService.createGame(deckId, name, type, remainingCards);
    expect(newGame.deckId).toEqual(deckId);
    expect(newGame.remainingCards).toEqual(remainingCards);
    expect(newGame.name).toEqual(name);
    expect(newGame.remainingCards).toEqual(remainingCards);
    expect(newGame.wins).toEqual(0);
    expect(newGame.losses).toEqual(0);
  });

  it('getGameList should return array with games', ()=> {
    const deckId: string = 'aaa';
    const name: string = 'Name';
    const type: GameType = GAME_OPTIONS['blackjack'];
    const remainingCards: number = 52;
    gameManagerService.createGame(deckId, name, type, remainingCards);
    const gameList: GameModel[] = gameManagerService.getGameList();
    expect(gameList.length).toBeGreaterThan(0);
  });

  it('getGameListByType should return array with games', ()=> {
    const deckId: string = 'aaa';
    const name: string = 'Name';
    const type: GameType = GAME_OPTIONS['blackjack'];
    const remainingCards: number = 52;
    gameManagerService.createGame(deckId, name, type, remainingCards);
    const gameList: GameModel[] = gameManagerService.getGameListByType(GAME_OPTIONS['blackjack']);
    expect(gameList.length).toBeGreaterThan(0);
  });

  it('getGameDetail should return empty array', ()=> {
    const deckId: string = 'THIS_ID_NOT_EXIST';
    const gameDetail: GameModel | undefined = gameManagerService.getGameDetail(deckId);

    expect(gameDetail).toBeUndefined();
  });

  it('updateGame', ()=> {
    const deckId: string = 'UPDATE_GAME';
    const name: string = 'Name';
    const updatedName: string = 'NEW name';
    const type: GameType = GAME_OPTIONS['blackjack'];
    const remainingCards: number = 52;
    let gameDetail!: GameModel;

    gameManagerService.createGame(deckId, name, type, remainingCards);
    gameDetail = gameManagerService.getGameDetail(deckId) as GameModel;
    expect(gameDetail.name).toEqual(name);
    gameDetail.name = updatedName;
    gameManagerService.updateGame(gameDetail);
    gameDetail = gameManagerService.getGameDetail(deckId) as GameModel;
    expect(gameDetail.name).toEqual(updatedName);
  });

  it('deleteGame', ()=> {
    const deckId: string = 'DELETE_GAME';
    const name: string = 'Name';
    const type: GameType = GAME_OPTIONS['blackjack'];
    const remainingCards: number = 52;
    let gameDetail!: GameModel;

    gameManagerService.createGame(deckId, name, type, remainingCards);
    gameDetail = gameManagerService.getGameDetail(deckId) as GameModel;
    expect(gameDetail).not.toBeUndefined();
    gameManagerService.deleteGame(deckId);
    gameDetail = gameManagerService.getGameDetail(deckId) as GameModel;
    expect(gameDetail).toBeUndefined();
  });

});
