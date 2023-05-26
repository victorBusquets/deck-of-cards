import { CardInterface } from "./card.interface";

export interface DrawCardsResponseInterface {
    success: boolean;
    deck_id: string; 
    cards: CardInterface[];
    remaining: number;
}
