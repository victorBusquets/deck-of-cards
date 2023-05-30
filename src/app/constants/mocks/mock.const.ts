import { ACE } from "@constants/game-options.const";
import { CardInterface } from "@interfaces/card.interface";
import { DeckResponseInterface } from "@interfaces/deck-response.interface";
import { DrawCardsResponseInterface } from "@interfaces/draw-cards-response.interface";
import { PileListResponseInterface, PileResponseInterface } from "@interfaces/pile-response.interface";
import { SUIT_OPTIONS } from "src/app/modules/guess-suit/suit-options.const";

export const DECK_MOCK_RESPONSE: DeckResponseInterface = {
    deck_id: 'aaa',
    remaining: 52,
    shuffled: true,
    success: true
};

export const DRAW_CARDS_MOCK_RESPONSE: DrawCardsResponseInterface = {
    success: true,
    deck_id: 'aaa', 
    cards: [],
    remaining: 52
};

export const ADD_CARDS_PILE_MOCK_RESPONSE: PileResponseInterface = {
    deck_id: 'aaa',
    success: true,
    remaining: 52,
    piles: {}
};

export const GET_CARDS_PILE_MOCK_RESPONSE: PileListResponseInterface =
    ADD_CARDS_PILE_MOCK_RESPONSE as PileListResponseInterface;

export const CARD_LIST_WITH_ACE: CardInterface[] = [
    {
        code: '',
        image: '', 
        value: ACE, 
        suit: 'HEARTS',
        images: { svg: '', png: ''}
    }, {
        code: '',
        image: '', 
        value: '3', 
        suit: 'HEARTS',
        images: { svg: '', png: ''}
    }
];

export const CARD_LIST_WIT_MULTIPLE_ACE: CardInterface[] = [
    {
        code: '',
        image: '', 
        value: ACE, 
        suit: 'HEARTS',
        images: { svg: '', png: ''}
    }, {
        code: '',
        image: '', 
        value: ACE, 
        suit: 'CLUBS',
        images: { svg: '', png: ''}
    }, {
        code: '',
        image: '', 
        value: ACE, 
        suit: 'DIAMONDS',
        images: { svg: '', png: ''}
    }, {
        code: '',
        image: '', 
        value: '9', 
        suit: 'HEARTS',
        images: { svg: '', png: ''}
    }
];

export const CARD_LIST_WITHOUT_ACE: CardInterface[] = [
    {
        code: '',
        image: '', 
        value: '9', 
        suit: 'HEARTS',
        images: { svg: '', png: ''}
    }, {
        code: '',
        image: '', 
        value: '3', 
        suit: 'HEARTS',
        images: { svg: '', png: ''}
    }
];