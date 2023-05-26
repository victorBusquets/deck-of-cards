export interface CardInterface {
    code: string;
    image: string; 
    value: string; 
    suit: 'HEARTS' | 'SPADES' | 'CLUBS' | 'DIAMONDS';
    images: { svg: string; png: string;} 
}
