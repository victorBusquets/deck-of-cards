import { APP_ROUTE_FRAGMENTS } from "@constants/app-routes.const";
import { GAME_OPTIONS } from "@constants/common.const";

export const GAME_LINKS = [
    {
        title: 'Blackjack',
        link: ['/', APP_ROUTE_FRAGMENTS.gameList, GAME_OPTIONS['blackjack']]
    },
    {
        title: 'Adivina la carta',
        link: ['/', APP_ROUTE_FRAGMENTS.gameList, GAME_OPTIONS['guessSuit']]
    }
]