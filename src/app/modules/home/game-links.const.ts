import { APP_ROUTE_FRAGMENTS } from "@constants/app-routes.const";
import { GAME_OPTIONS } from "@constants/common.const";
import { GAME_TITLE } from "@constants/game-title.const";

export const GAME_LINKS = [
    {
        title: GAME_TITLE['blackjack'],
        link: ['/', APP_ROUTE_FRAGMENTS.gameList, GAME_OPTIONS['blackjack']]
    },
    {
        title: GAME_TITLE['guess-suit'],
        link: ['/', APP_ROUTE_FRAGMENTS.gameList, GAME_OPTIONS['guessSuit']]
    }
]