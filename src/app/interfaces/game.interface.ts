export interface GameInterface {
    type: 'blackjack' | 'guesssuit';
    deckId: string;
    wins: number;
    losses: number;
}
