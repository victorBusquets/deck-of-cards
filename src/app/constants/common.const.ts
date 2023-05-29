import { GameType } from "../types/game.type";

export const DELETE_SVG: string = 'https://img.uxwing.com/wp-content/themes/uxwing/download/user-interface/delete-icon.svg';
export const BACK_CARD_IMG: string = 'https://deckofcardsapi.com/static/img/back.png';
export const GAME_OPTIONS: Record<string, GameType> = {
    blackjack: 'blackjack',
    guessSuit: 'guess-suit'
}
export const TRACK_BY_INDEX_FUNCTION = (index: number) => index;

export const MAX_SCORE: number = 21;
