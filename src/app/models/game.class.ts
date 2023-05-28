import { GameType } from "../types/game.type";

export class GameModel {
    type: GameType = 'blackjack';
    deckId: string = '';
    wins: number = 0;
    losses: number = 0;
    remainingCards: number = 0;
    lastChange: Date = new Date();
    name: string = '';
    
    constructor(game?: Partial<GameModel>) {
        this.type = game?.type ?? this.type;
        this.deckId = game?.deckId ?? this.deckId;
        this.wins = game?.wins ?? this.wins;
        this.losses = game?.losses ?? this.losses;
        this.remainingCards = game?.remainingCards ?? this.remainingCards;
        this.lastChange = game?.lastChange ?? this.lastChange;
        this.name = game?.name ?? this.name;
    }
}
