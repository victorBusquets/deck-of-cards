import { BreadcrumbInterface } from "@interfaces/breadcrumb.interface";
import { APP_ROUTE_FRAGMENTS } from "./app-routes.const";
import { GAME_OPTIONS } from "./common.const";

export const BREADCRUMB_OPTIONS: Record<string, BreadcrumbInterface[]> = {
    'home': [
        {name: 'Home', link: ['/']}
    ],
    'gameList': [
        {name: 'Home', link: ['/']},
        {name: 'Listado partidas', link: ['/', APP_ROUTE_FRAGMENTS.gameList]}
    ],
    'gameDetailBlackjack': [
        {name: 'Home', link: ['/']},
        {name: 'Listado partidas', link: ['/', APP_ROUTE_FRAGMENTS.gameList, GAME_OPTIONS['blackjack']]},
        {name: 'Detalle', link: ['/']}
    ],
    'gameDetailGuessSuit': [
        {name: 'Home', link: ['/']},
        {name: 'Listado partidas', link: ['/', APP_ROUTE_FRAGMENTS.gameList, GAME_OPTIONS['guessSuit']]},
        {name: 'Detalle', link: ['/']}
    ]
};