import { GameType } from "../types/game.type";

export const BACK_CARD_IMG: string = 'https://deckofcardsapi.com/static/img/back.png';
export const GAME_OPTIONS: Record<string, GameType> = {
    blackjack: 'blackjack',
    guessSuit: 'guess-suit'
}
export const TRACK_BY_INDEX_FUNCTION = (index: number) => index;
