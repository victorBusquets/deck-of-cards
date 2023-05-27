export class GameModel {
    type: 'blackjack' | 'guess-suit' = 'blackjack';
    deckId: string = '';
    wins: number = 0;
    losses: number = 0;
    remainingCards: number = 0;
    
    constructor(game?: Partial<GameModel>) {
        this.type = game?.type ?? this.type;
        this.deckId = game?.deckId ?? this.deckId;
        this.wins = game?.wins ?? this.wins;
        this.losses = game?.losses ?? this.losses;
        this.remainingCards = game?.remainingCards ?? this.remainingCards;
    }
}
