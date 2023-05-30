import { Injectable } from "@angular/core";
import { MAX_SCORE } from "@constants/common.const";
import { ACE, CARD_VALUES } from "@constants/game-options.const";
import { CardInterface } from "@interfaces/card.interface";

@Injectable({
    providedIn: 'root'
})
export class BlackjackUtils {
    getScore(cards: CardInterface[]): number {
        let score: number = 0;
        const cardValues: string[] = cards.map((card)=>card.value);
        const cardWithoutAces: string[] = cardValues.filter((value)=>value !== ACE); 
        const numberOfAces: number = cardValues.length - cardWithoutAces.length;
    
        score = cardWithoutAces
          .map((value) => CARD_VALUES[value] || +value)
          .reduce((a,b) => a+b);
        
        return this.addAcesValue(score, numberOfAces);
    }

    checkEndGame(): void {
        
    }

    private addAcesValue(score: number, numberOfAces: number): number {
        const bigAceScore: number = score + CARD_VALUES['BIG-ACE']  + numberOfAces -1;
        const bigAceIsValid: boolean = bigAceScore <= MAX_SCORE;
        
        return bigAceIsValid && numberOfAces ? this.addBigAce(score, numberOfAces) : score + numberOfAces;
    }
    
    private addBigAce(score: number, numberOfAces: number): number {
        const newScore: number = score + CARD_VALUES['BIG-ACE'];
        return numberOfAces > 1 ? this.addAcesValue(newScore, numberOfAces-1) : newScore;
    }
}
