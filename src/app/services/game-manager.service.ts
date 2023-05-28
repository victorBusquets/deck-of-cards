import { Injectable } from '@angular/core';
import { GameModel } from '@models/game.class';
import { GameType } from '../types/game.type';

const GAME_LS_KEY: string = 'GAME_LS_KEY';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  getGameList(): GameModel[] {
    const gameListString: string | null = localStorage.getItem(GAME_LS_KEY);
    let gameList: GameModel[] = [];

    if(gameListString) {
      try {
          gameList = JSON.parse(gameListString);
      } catch(error) {
          console.log('error parsing JSON GameManagerService.getGameList()', error);
      }
    }

    return gameList;
  }

  getGameListByType(type: GameType): GameModel[] {
    const gameList: GameModel[] = this.getGameList();

    return gameList.filter((game)=>game.type === type);
  }

  getGameDetail(deckId: string): GameModel | undefined {
    const gameList: GameModel[] = this.getGameList();

    return gameList.find((game)=>game.deckId === deckId);
  }

  createGame(deckId: string, name: string, type: GameType, remainingCards: number): GameModel {
    const gameList: GameModel[] = this.getGameList();
    const newGame: GameModel = new GameModel({type, deckId, remainingCards, name});
    gameList.unshift(newGame);
    this.saveGameList(gameList);
    return newGame;
  }

  editGame(game: GameModel): void {
    const gameList: GameModel[] = this.getGameList();
    const index: number = gameList.findIndex((gameItem)=>gameItem.deckId === game.deckId);
    
    if(index > -1) {
      game.lastChange = new Date();
      gameList[index] = game;
      this.saveGameList(gameList);
    }
  }

  deleteGame(deckId: string): void {
    const gameList: GameModel[] = this.getGameList();
    const index: number = gameList.findIndex((game)=>game.deckId === deckId);
    gameList.splice(index, 1);
    
    this.saveGameList(gameList);
  }

  saveGameList(gameList: GameModel[]): void {
    const gameListString: string = JSON.stringify(gameList);
    localStorage.setItem(GAME_LS_KEY, gameListString);
  }
}
