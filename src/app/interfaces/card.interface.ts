import { CardType } from "../types/card.type";

export interface CardInterface {
    code: string;
    image: string; 
    value: string; 
    suit: CardType;
    images: { svg: string; png: string;} 
}
