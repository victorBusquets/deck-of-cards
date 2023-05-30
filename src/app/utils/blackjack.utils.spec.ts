import { TestBed } from "@angular/core/testing";
import { BlackjackUtils } from "./blackjack.utils";
import { CARD_LIST_WITHOUT_ACE, CARD_LIST_WITH_ACE, CARD_LIST_WIT_MULTIPLE_ACE } from "@constants/mocks/mock.const";
import { CardInterface } from "@interfaces/card.interface";

describe('BlackjackUtils', () => {
    let blackjackUtils: BlackjackUtils;
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      blackjackUtils = TestBed.inject(BlackjackUtils);
    });
  
    it('should be created', () => {
      expect(blackjackUtils).toBeTruthy();
    });

    it('getScore', ()=>{
        const scoreWithAce: number = blackjackUtils.getScore(CARD_LIST_WITH_ACE);
        expect(scoreWithAce).toEqual(14);
        const scoreWithMultipleAce: number = blackjackUtils.getScore(CARD_LIST_WIT_MULTIPLE_ACE);
        expect(scoreWithMultipleAce).toEqual(12);
        const scoreWithoutAce: number = blackjackUtils.getScore(CARD_LIST_WITHOUT_ACE);
        expect(scoreWithoutAce).toEqual(12);
    });

    it('formatCardsResponse with setVisible true should return visible cards', ()=> {
        const cardList: CardInterface[] = blackjackUtils.formatCardsResponse(CARD_LIST_WITH_ACE, true);
        expect(cardList[0].visible).toBeTrue();
    });

    it('formatCardsResponse with setVisible false should return invisible cards', ()=> {
        const cardList: CardInterface[] = blackjackUtils.formatCardsResponse(CARD_LIST_WITH_ACE, false);
        expect(cardList[0].visible).toBeFalse();
    });
});