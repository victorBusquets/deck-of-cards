export const GAME_NUMBER_OF_DECKS: Record<string, number> = {
    'blackjack': 6,
    'guess-suit': 1
};

export const CARDS_BY_DECK: number = 52;
export const BLACKJACK_CARDS: number = CARDS_BY_DECK * GAME_NUMBER_OF_DECKS['blackjack'];
export const MIN_BLACKJACK_CARDS: number = BLACKJACK_CARDS / 2;

export const ACE = 'ACE';

export const CARD_VALUES: Record<string, number> = {
    '0': 10,
    'JACK': 10,
    'BIG-ACE': 11,
    'QUEEN': 11,
    'KING': 12,
};
