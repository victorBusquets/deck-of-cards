import { Injectable } from '@angular/core';
import { GameInterface } from '@interfaces/game.interface';

const GAME_LS_KEY: string = 'GAME_LS_KEY';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  getGameList(): GameInterface[] {
    const gameListString: string | null = localStorage.getItem(GAME_LS_KEY);
    let gameList: GameInterface[] = [];

    if(gameListString) {
      try {
          gameList = JSON.parse(gameListString);
      } catch(error) {
          console.log('error parsing JSON GameManagerService.getGameList()', error);
      }
    }

    return gameList;
  }

  getGameListByType(type: 'blackjack' | 'guesssuit'): GameInterface[] {
    const gameList: GameInterface[] = this.getGameList();

    return gameList.filter((game)=>game.type === type);
  }

  getGameDetail(deckId: string): GameInterface | undefined {
    const gameList: GameInterface[] = this.getGameList();

    return gameList.find((game)=>game.deckId === deckId);
  }

  createGame(deckId: string, type:'blackjack' | 'guesssuit' ): void {
    const gameList: GameInterface[] = this.getGameList();
    const newGame: GameInterface = {
      type,
      deckId,
      wins: 0,
      losses: 0
    };
    gameList.unshift(newGame);
    this.saveGameList(gameList);
  }

  editGame(game: GameInterface): void {
    const gameList: GameInterface[] = this.getGameList();
    const index: number = gameList.findIndex((gameItem)=>gameItem.deckId === game.deckId);
    
    if(index > -1) {
      gameList[index] = game;
      this.saveGameList(gameList);
    }
  }

  deleteGame(deckId: string): void {
    const gameList: GameInterface[] = this.getGameList();
    const index: number = gameList.findIndex((game)=>game.deckId === deckId);
    gameList.splice(index, 1);
    
    this.saveGameList(gameList);
  }

  saveGameList(gameList: GameInterface[]): void {
    const gameListString: string = JSON.stringify(gameList);
    localStorage.setItem(GAME_LS_KEY, gameListString);
  }
}
