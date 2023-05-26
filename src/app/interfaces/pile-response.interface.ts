import { CardInterface } from "./card.interface";

export interface PileResponseInterface {
    deck_id: string;
    success: boolean;
    remaining: number;
    piles: Record<string, {remaining: number}>;
}

export interface PileListResponseInterface extends Omit<PileResponseInterface, 'piles'>  {
    piles: Record<string, {cards: CardInterface[]; remaining: number}>;
}